const CreateOrderUseCase = require("../../../../Applications/use_case/OrderUseCase/CreateOrderUseCase");
const GetOrderDetailUseCase = require("../../../../Applications/use_case/OrderUseCase/GetOrderDetailUseCase");

class OrdersHandler {
  constructor(container) {
    this._container = container;

    this.postOrderHandler = this.postOrderHandler.bind(this);
    this.getOrderByIdHandler = this.getOrderByIdHandler.bind(this);
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

    const { order, payment, paymentUrl } = await createOrderUseCase.execute(
      useCasePayload
    );

    const response = h.response({
      status: "success",
      data: {
        order,
        payment,
        paymentUrl,
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
}

module.exports = OrdersHandler;
