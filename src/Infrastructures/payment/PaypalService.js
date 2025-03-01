const axios = require("axios");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class PaypalService {
  constructor() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("PAYPAL_SERVICE.MISSING_CREDENTIALS");
    }

    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.paypal.com"
        : "https://api-m.sandbox.paypal.com";
  }

  async _getAccessToken() {
    try {
      const auth = Buffer.from(
        `${this._clientId}:${this._clientSecret}`
      ).toString("base64");
      const response = await axios.post(
        `${this._baseUrl}/v1/oauth2/token`,
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      throw new InvariantError("gagal mendapatkan token paypal");
    }
  }

  async createPayment({ amount, currency, orderId, successUrl, cancelUrl }) {
    try {
      const accessToken = await this._getAccessToken();

      const response = await axios.post(
        `${this._baseUrl}/v2/checkout/orders`,
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toString(),
              },
              custom_id: orderId,
            },
          ],
          application_context: {
            return_url: successUrl,
            cancel_url: cancelUrl,
            brand_name: "Toko Rantau",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { id, links } = response.data;
      const approvalUrl = links.find((link) => link.rel === "approve").href;

      return {
        id,
        approvalUrl,
      };
    } catch (error) {
      console.error("PayPal API Error:", error.response?.data || error.message);
      throw new InvariantError("gagal membuat pembayaran paypal");
    }
  }

  async verifyWebhookSignature(webhookPayload) {
    console.log("Verifying PayPal webhook signature...");
    try {
      const accessToken = await this._getAccessToken();

      const response = await axios.post(
        `${this._baseUrl}/v1/notifications/verify-webhook-signature`,
        {
          auth_algo: webhookPayload.auth_algo,
          cert_url: webhookPayload.cert_url,
          transmission_id: webhookPayload.transmission_id,
          transmission_sig: webhookPayload.transmission_sig,
          transmission_time: webhookPayload.transmission_time,
          webhook_id: process.env.PAYPAL_WEBHOOK_ID,
          webhook_event: webhookPayload,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.verification_status === "SUCCESS";
    } catch (error) {
      console.log(
        "PayPal Webhook Error:",
        error.response?.data || error.message
      );
      return false;
    }
  }
}

module.exports = PaypalService;
