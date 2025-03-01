const ProcessPaypalWebhookUseCase = require("../../../../Applications/use_case/PaymentUseCase/ProcessPaypalWebhookUseCase");

class PaymentsHandler {
  constructor(container) {
    this._container = container;

    this.postPaypalWebhookHandler = this.postPaypalWebhookHandler.bind(this);
  }

  async postPaypalWebhookHandler(request, h) {
    const processPaypalWebhookUseCase = this._container.getInstance(
      ProcessPaypalWebhookUseCase.name
    );
    console.log(request.payload);
    const webhookPayload = {
      event_type: request.payload.event_type,
      resource: request.payload.resource,
      auth_algo: request.headers["paypal-auth-algo"],
      cert_url: request.headers["paypal-cert-url"],
      transmission_id: request.headers["paypal-transmission-id"],
      transmission_sig: request.headers["paypal-transmission-sig"],
      transmission_time: request.headers["paypal-transmission-time"],
    };
    console.log("webhookPayload", webhookPayload);
    await processPaypalWebhookUseCase.execute(webhookPayload);

    const response = h.response({
      status: "success",
      message: "webhook processed successfully",
    });
    response.code(200);
    return response;
  }
}

module.exports = PaymentsHandler;
