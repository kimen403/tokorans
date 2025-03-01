const paypal = require("@paypal/checkout-server-sdk");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class PaypalService {
  constructor() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("PAYPAL_SERVICE.MISSING_CREDENTIALS");
    }

    const environment =
      process.env.NODE_ENV === "production"
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);

    this._client = new paypal.core.PayPalHttpClient(environment);
  }

  async createPayment({ amount, currency, orderId, successUrl, cancelUrl }) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
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
      },
    });

    try {
      const order = await this._client.execute(request);
      const approvalUrl = order.result.links.find(
        (link) => link.rel === "approve"
      ).href;

      return {
        id: order.result.id,
        approvalUrl,
      };
    } catch (error) {
      throw new InvariantError("gagal membuat pembayaran paypal");
    }
  }

  async verifyWebhookSignature(webhookPayload) {
    console.log("Verifying webhook signature...");
    const request = new paypal.notifications.VerifyWebhookSignatureRequest();
    try {
      console.log("Setting request body...");
      request.requestBody({
        auth_algo: webhookPayload.auth_algo,
        cert_url: webhookPayload.cert_url,
        transmission_id: webhookPayload.transmission_id,
        transmission_sig: webhookPayload.transmission_sig,
        transmission_time: webhookPayload.transmission_time,
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: webhookPayload,
      });
      console.log("Request body set successfully.");

      try {
        console.log("Executing request...");
        const response = await this._client.execute(request);
        console.log("Request executed successfully.");
        console.log(
          "Webhook verification status: ",
          response.result.verification_status
        );
        return response.result.verification_status === "SUCCESS";
      } catch (error) {
        console.log("Error executing request: ", error);
        return false;
      }
    } catch (error) {
      console.log("Error setting request body: ", error);
      return false;
    }
  }
}

module.exports = PaypalService;
