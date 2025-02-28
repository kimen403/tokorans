const InvariantError = require("../../../Commons/exceptions/InvariantError");

class CreatePaypalPaymentUseCase {
  constructor({ orderRepository, paymentRepository, paypalService }) {
    this._orderRepository = orderRepository;
    this._paymentRepository = paymentRepository;
    this._paypalService = paypalService;
  }

  async execute(useCasePayload) {
    const { orderId, userId } = useCasePayload;

    // Verify order ownership and status
    const isOwner = await this._orderRepository.verifyOrderOwner(
      orderId,
      userId
    );
    if (!isOwner) {
      throw new InvariantError("anda tidak berhak mengakses order ini");
    }

    const order = await this._orderRepository.getOrderById(orderId);
    if (order.status !== "pending") {
      throw new InvariantError("order sudah dibayar atau dibatalkan");
    }

    const payment = await this._paymentRepository.getPaymentByOrderId(orderId);
    if (payment.status !== "pending") {
      throw new InvariantError("pembayaran sudah diproses");
    }

    // Create PayPal payment
    const paypalPayment = await this._paypalService.createPayment({
      amount: payment.amount,
      currency: "USD",
      orderId: orderId,
      successUrl: `${process.env.APP_URL}/payments/${payment.id}/success`,
      cancelUrl: `${process.env.APP_URL}/payments/${payment.id}/cancel`,
    });

    // Update payment and order status
    await this._paymentRepository.updatePaymentStatus(orderId, "processing");
    await this._orderRepository.updateOrderStatus(orderId, "processing");

    return {
      paymentUrl: paypalPayment.approvalUrl,
      paymentId: paypalPayment.id,
    };
  }
}

module.exports = CreatePaypalPaymentUseCase;
