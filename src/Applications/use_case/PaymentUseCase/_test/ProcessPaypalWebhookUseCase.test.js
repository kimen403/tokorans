const OrderRepository = require("../../../../Domains/orders/OrderRepository");
const PaymentRepository = require("../../../../Domains/payments/PaymentRepository");
const PaypalService = require("../../../../Infrastructures/payment/PaypalService");
const ProcessPaypalWebhookUseCase = require("../ProcessPaypalWebhookUseCase");
const InvariantError = require("../../../../Commons/exceptions/InvariantError");

describe("ProcessPaypalWebhookUseCase", () => {
  it("should process PAYMENT.CAPTURE.COMPLETED webhook correctly", async () => {
    // Arrange
    const webhookPayload = {
      transmission_id: "123",
      transmission_time: "2025-02-28T20:01:35Z",
      cert_url: "cert_url",
      auth_algo: "SHA256withRSA",
      transmission_sig: "signature",
      webhook_event: {
        id: "WH-123",
        event_type: "PAYMENT.CAPTURE.COMPLETED",
        resource: {
          id: "PAYPAL-123",
          purchase_units: [
            {
              custom_id: "order-123",
            },
          ],
        },
      },
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockPaypalService.verifyWebhookSignature = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockOrderRepository.updateOrderStatus = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockPaymentRepository.updatePaymentStatus = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const processPaypalWebhookUseCase = new ProcessPaypalWebhookUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action
    await processPaypalWebhookUseCase.execute(webhookPayload);

    // Assert
    expect(mockPaypalService.verifyWebhookSignature).toBeCalledWith(
      webhookPayload
    );
    expect(mockOrderRepository.updateOrderStatus).toBeCalledWith(
      "order-123",
      "completed"
    );
    expect(mockPaymentRepository.updatePaymentStatus).toBeCalledWith(
      "order-123",
      "completed",
      "PAYPAL-123"
    );
  });

  it("should process PAYMENT.CAPTURE.DENIED webhook correctly", async () => {
    // Arrange
    const webhookPayload = {
      transmission_id: "123",
      transmission_time: "2025-02-28T20:01:35Z",
      cert_url: "cert_url",
      auth_algo: "SHA256withRSA",
      transmission_sig: "signature",
      webhook_event: {
        id: "WH-123",
        event_type: "PAYMENT.CAPTURE.DENIED",
        resource: {
          id: "PAYPAL-123",
          purchase_units: [
            {
              custom_id: "order-123",
            },
          ],
        },
      },
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockPaypalService.verifyWebhookSignature = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    mockOrderRepository.updateOrderStatus = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockPaymentRepository.updatePaymentStatus = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const processPaypalWebhookUseCase = new ProcessPaypalWebhookUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action
    await processPaypalWebhookUseCase.execute(webhookPayload);

    // Assert
    expect(mockPaypalService.verifyWebhookSignature).toBeCalledWith(
      webhookPayload
    );
    expect(mockOrderRepository.updateOrderStatus).toBeCalledWith(
      "order-123",
      "cancelled"
    );
    expect(mockPaymentRepository.updatePaymentStatus).toBeCalledWith(
      "order-123",
      "failed",
      "PAYPAL-123"
    );
  });

  it("should throw error if webhook signature is invalid", async () => {
    // Arrange
    const webhookPayload = {
      transmission_id: "123",
      transmission_time: "2025-02-28T20:01:35Z",
      cert_url: "cert_url",
      auth_algo: "SHA256withRSA",
      transmission_sig: "invalid_signature",
      webhook_event: {
        id: "WH-123",
        event_type: "PAYMENT.CAPTURE.COMPLETED",
        resource: {
          id: "PAYPAL-123",
          purchase_units: [
            {
              custom_id: "order-123",
            },
          ],
        },
      },
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockPaypalService.verifyWebhookSignature = jest
      .fn()
      .mockImplementation(() => Promise.resolve(false));

    /** creating use case instance */
    const processPaypalWebhookUseCase = new ProcessPaypalWebhookUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action & Assert
    await expect(
      processPaypalWebhookUseCase.execute(webhookPayload)
    ).rejects.toThrowError(InvariantError);
    expect(mockPaypalService.verifyWebhookSignature).toBeCalledWith(
      webhookPayload
    );
  });

  it("should throw error if order id not found in webhook payload", async () => {
    // Arrange
    const webhookPayload = {
      transmission_id: "123",
      transmission_time: "2025-02-28T20:01:35Z",
      cert_url: "cert_url",
      auth_algo: "SHA256withRSA",
      transmission_sig: "signature",
      webhook_event: {
        id: "WH-123",
        event_type: "PAYMENT.CAPTURE.COMPLETED",
        resource: {
          id: "PAYPAL-123",
          // missing purchase_units and custom_id
        },
      },
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockPaypalService.verifyWebhookSignature = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    /** creating use case instance */
    const processPaypalWebhookUseCase = new ProcessPaypalWebhookUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action & Assert
    await expect(
      processPaypalWebhookUseCase.execute(webhookPayload)
    ).rejects.toThrowError(InvariantError);
  });

  it("should throw error for unsupported event types", async () => {
    // Arrange
    const webhookPayload = {
      transmission_id: "123",
      transmission_time: "2025-02-28T20:01:35Z",
      cert_url: "cert_url",
      auth_algo: "SHA256withRSA",
      transmission_sig: "signature",
      webhook_event: {
        id: "WH-123",
        event_type: "UNSUPPORTED.EVENT",
        resource: {
          id: "PAYPAL-123",
          purchase_units: [
            {
              custom_id: "order-123",
            },
          ],
        },
      },
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();
    const mockPaymentRepository = new PaymentRepository();
    const mockPaypalService = new PaypalService();

    /** mocking needed function */
    mockPaypalService.verifyWebhookSignature = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    /** creating use case instance */
    const processPaypalWebhookUseCase = new ProcessPaypalWebhookUseCase({
      orderRepository: mockOrderRepository,
      paymentRepository: mockPaymentRepository,
      paypalService: mockPaypalService,
    });

    // Action & Assert
    await expect(
      processPaypalWebhookUseCase.execute(webhookPayload)
    ).rejects.toThrowError(InvariantError);
  });
});
