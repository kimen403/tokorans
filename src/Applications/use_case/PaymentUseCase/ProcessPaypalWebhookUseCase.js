const InvariantError = require("../../../Commons/exceptions/InvariantError");

class ProcessPaypalWebhookUseCase {
  constructor({ orderRepository, paymentRepository, paypalService }) {
    this._orderRepository = orderRepository;
    this._paymentRepository = paymentRepository;
    this._paypalService = paypalService;
  }

  async execute(useCasePayload) {
    const { event_type, resource } = useCasePayload;
    console.log("Processing Paypal webhook...");
    console.log(`Event type: ${event_type}`);
    // Verify webhook signature
    console.log("paypalService", this._paypalService);
    const isValid = await this._paypalService.verifyWebhookSignature(
      useCasePayload
    );
    console.log(`Webhook signature is valid: ${isValid}`);
    if (!isValid) {
      throw new InvariantError("invalid webhook signature");
    }

    const { id: paypalTransactionId, custom_id: orderId } = resource;
    console.log(`Paypal transaction ID: ${paypalTransactionId}`);
    console.log(`Order ID: ${orderId}`);
    console.log(`Event type: ${event_type}`);
    switch (event_type) {
      case "PAYMENT.CAPTURE.COMPLETED":
        // Update payment status to completed
        await this._paymentRepository.updatePaymentStatus(
          orderId,
          "completed",
          paypalTransactionId
        );
        // Update order status to completed
        await this._orderRepository.updateOrderStatus(orderId, "completed");
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
