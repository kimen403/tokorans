const InvariantError = require("../../../Commons/exceptions/InvariantError");

class ProcessPaypalWebhookUseCase {
  constructor({ orderRepository, paymentRepository, paypalService }) {
    this._orderRepository = orderRepository;
    this._paymentRepository = paymentRepository;
    this._paypalService = paypalService;
  }

  async execute(useCasePayload) {
    const isValid = await this._paypalService.verifyWebhookSignature(
      useCasePayload
    );
    console.log("verifycation : ", isValid);
    if (!isValid) {
      throw new InvariantError("invalid webhook signature");
    }

    const { event_type, resource } = useCasePayload.webhook_event;
    console.log("event_type : ", event_type);
    console.log("resource : ", resource);
    const orderId =
      resource.purchase_units?.[0]?.custom_id || resource.custom_id;
    const paypalTransactionId = resource.id;

    if (!orderId) {
      throw new InvariantError("order id not found in webhook payload");
    }
    console.log("orderId : ", orderId);
    console.log("paypalTransactionId : ", paypalTransactionId);

    switch (event_type) {
      case "CHECKOUT.ORDER.APPROVED":
        // Update payment status to completed
        console.log("CHECKOUT.ORDER.APPROVED");
        console.log("masuk payment repository");
        await this._paymentRepository.updatePaymentStatus(
          orderId,
          "completed",
          paypalTransactionId
        );
        // Update order status to completed
        await this._orderRepository.updateOrderStatus(orderId, "completed");
        console.log("selesai payment repository");
        break;

      case "PAYMENT.CAPTURE.DENIED":
      case "PAYMENT.CAPTURE.DECLINED":
        // Update payment status to failed
        await this._paymentRepository.updatePaymentStatus(
          orderId,
          "failed",
          paypalTransactionId
        );
        // Update order status to cancelled
        await this._orderRepository.updateOrderStatus(orderId, "cancelled");
        break;

      default:
        throw new InvariantError(`unsupported webhook event: ${event_type}`);
    }

    return {
      success: true,
      message: "Webhook processed successfully",
    };
  }
}

module.exports = ProcessPaypalWebhookUseCase;
