const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const DetailOrder = require("../../../Domains/orders/entities/DetailOrder");

class GetOrderDetailUseCase {
  constructor({ orderRepository, productRepository, paymentRepository }) {
    this._orderRepository = orderRepository;
    this._productRepository = productRepository;
    this._paymentRepository = paymentRepository;
  }

  async execute(useCasePayload) {
    const { orderId, userId } = useCasePayload;

    // Verify order ownership
    const isOwner = await this._orderRepository.verifyOrderOwner(
      orderId,
      userId
    );
    if (!isOwner) {
      throw new AuthorizationError("anda tidak berhak mengakses resource ini");
    }

    // Get order data
    const order = await this._orderRepository.getOrderById(orderId);

    // Get related product
    const product = await this._productRepository.getProductById(
      order.productId
    );

    // Get related payment
    const payment = await this._paymentRepository.getPaymentByOrderId(orderId);

    return new DetailOrder({
      ...order,
      createdAt: new Date(order.createdAt),
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      payment: payment
        ? {
            id: payment.id,
            status: payment.status,
            paymentMethod: payment.paymentMethod,
            paypalTransactionId: payment.paypalTransactionId,
            amount: payment.amount,
            createdAt: new Date(payment.createdAt),
          }
        : null,
    });
  }
}

module.exports = GetOrderDetailUseCase;
