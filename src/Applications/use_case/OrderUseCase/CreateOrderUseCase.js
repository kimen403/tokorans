const NewOrder = require("../../../Domains/orders/entities/NewOrder");
const NewPayment = require("../../../Domains/payments/entities/NewPayment");

class CreateOrderUseCase {
  constructor({ orderRepository, productRepository, paymentRepository }) {
    this._orderRepository = orderRepository;
    this._productRepository = productRepository;
    this._paymentRepository = paymentRepository;
  }

  async execute(useCasePayload) {
    const { userId, productId, quantity } = useCasePayload;

    // Verify product exists and calculate total amount
    const product = await this._productRepository.getProductById(productId);
    const totalAmount = product.price * quantity;

    // Create new order
    const newOrder = new NewOrder({
      userId,
      productId,
      quantity,
      totalAmount,
    });

    const order = await this._orderRepository.addOrder(newOrder);

    // Create payment for the order
    const newPayment = new NewPayment({
      orderId: order.id,
      paymentMethod: "paypal",
      amount: totalAmount,
    });

    const payment = await this._paymentRepository.addPayment(newPayment);

    return {
      order,
      payment,
    };
  }
}

module.exports = CreateOrderUseCase;
