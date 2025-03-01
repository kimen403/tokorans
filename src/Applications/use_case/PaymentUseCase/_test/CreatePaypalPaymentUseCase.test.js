const OrderRepository = require("../../../../Domains/orders/OrderRepository");
const PaymentRepository = require("../../../../Domains/payments/PaymentRepository");
const PaypalService = require("../../../../Infrastructures/payment/PaypalService");
const CreatePaypalPaymentUseCase = require("../CreatePaypalPaymentUseCase");
const InvariantError = require("../../../../Commons/exceptions/InvariantError");

describe("CreatePaypalPaymentUseCase", () => {
  it("should orchestrating create paypal payment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      orderId: "order-123",
      userId: "user-123",
    };

    const mockOrder = {
      id: "order-123",
      userId: "user-123",
      totalAmount: 100,
      status: "pending",
    };

    const mockPayment = {
      id: "payment-123",
      orderId: "order-123",
      status: "pending",
      amount: 100,
    };

    const mockPaypalResponse = {
      id: "PAYPAL-123",
      approvalUrl: "https://paypal.com/checkout",
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockOrderRepository.getOrderById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockOrder));

    mockPaymentRepository.getPaymentByOrderId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockPayment));

    mockPaypalService.createPayment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockPaypalResponse));

    /** creating use case instance */
    const createPaypalPaymentUseCase = new CreatePaypalPaymentUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action
    const paypalPayment = await createPaypalPaymentUseCase.execute(
      useCasePayload
    );

    // Assert
    expect(mockOrderRepository.getOrderById).toBeCalledWith("order-123");
    expect(mockPaymentRepository.getPaymentByOrderId).toBeCalledWith(
      "order-123"
    );
    expect(mockPaypalService.createPayment).toBeCalledWith({
      amount: 100,
      currency: "USD",
      orderId: "order-123",
      successUrl: expect.any(String),
      cancelUrl: expect.any(String),
    });
    expect(paypalPayment).toStrictEqual(mockPaypalResponse);
  });

  it("should throw error if order not found", async () => {
    // Arrange
    const useCasePayload = {
      orderId: "order-123",
      userId: "user-123",
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockOrderRepository.getOrderById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    /** creating use case instance */
    const createPaypalPaymentUseCase = new CreatePaypalPaymentUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action & Assert
    await expect(
      createPaypalPaymentUseCase.execute(useCasePayload)
    ).rejects.toThrowError(InvariantError);
  });

  it("should throw error if order already paid", async () => {
    // Arrange
    const useCasePayload = {
      orderId: "order-123",
      userId: "user-123",
    };

    const mockOrder = {
      id: "order-123",
      userId: "user-123",
      totalAmount: 100,
      status: "completed",
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockOrderRepository.getOrderById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockOrder));

    /** creating use case instance */
    const createPaypalPaymentUseCase = new CreatePaypalPaymentUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action & Assert
    await expect(
      createPaypalPaymentUseCase.execute(useCasePayload)
    ).rejects.toThrowError(InvariantError);
  });

  it("should throw error if user is not the order owner", async () => {
    // Arrange
    const useCasePayload = {
      orderId: "order-123",
      userId: "user-456", // different user
    };

    const mockOrder = {
      id: "order-123",
      userId: "user-123",
      totalAmount: 100,
      status: "pending",
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockOrderRepository.getOrderById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockOrder));

    /** creating use case instance */
    const createPaypalPaymentUseCase = new CreatePaypalPaymentUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action & Assert
    await expect(
      createPaypalPaymentUseCase.execute(useCasePayload)
    ).rejects.toThrowError(InvariantError);
  });
});
