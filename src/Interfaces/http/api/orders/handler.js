const CreateOrderUseCase = require("../../../../Applications/use_case/OrderUseCase/CreateOrderUseCase");
const GetOrderDetailUseCase = require("../../../../Applications/use_case/OrderUseCase/GetOrderDetailUseCase");
const CreatePaypalPaymentUseCase = require("../../../../Applications/use_case/PaymentUseCase/CreatePaypalPaymentUseCase");

class OrdersHandler {
  constructor(container) {
    this._container = container;

    this.postOrderHandler = this.postOrderHandler.bind(this);
    this.getOrderByIdHandler = this.getOrderByIdHandler.bind(this);
    this.createPaypalPaymentHandler =
      this.createPaypalPaymentHandler.bind(this);
  }

  async postOrderHandler(request, h) {
    const createOrderUseCase = this._container.getInstance(
      CreateOrderUseCase.name
    );
    const { id: userId } = request.auth.credentials;

    const useCasePayload = {
      userId,
      productId: request.payload.productId,
      quantity: request.payload.quantity,
    };

    const { order, payment } = await createOrderUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      data: {
        order,
        payment,
      },
    });
    response.code(201);
    return response;
  }

  async getOrderByIdHandler(request) {
    const getOrderDetailUseCase = this._container.getInstance(
      GetOrderDetailUseCase.name
    );
    const { id: orderId } = request.params;
    const { id: userId } = request.auth.credentials;

    const order = await getOrderDetailUseCase.execute({
      orderId,
      userId,
    });

    return {
      status: "success",
      data: {
        order,
      },
    };
  }

  async createPaypalPaymentHandler(request) {
    const createPaypalPaymentUseCase = this._container.getInstance(
      CreatePaypalPaymentUseCase.name
    );
    const { id: orderId } = request.params;
    const { id: userId } = request.auth.credentials;

    const paypalPayment = await createPaypalPaymentUseCase.execute({
      orderId,
      userId,
    });

    return {
      status: "success",
      data: {
        paymentUrl: paypalPayment.paymentUrl,
      },
    };
  }
}

module.exports = OrdersHandler;
