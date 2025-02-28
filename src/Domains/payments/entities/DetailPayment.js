class DetailPayment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.orderId = payload.orderId;
    this.paymentMethod = payload.paymentMethod;
    this.status = payload.status;
    this.paypalTransactionId = payload.paypalTransactionId;
    this.amount = payload.amount;
    this.createdAt = payload.createdAt;
    this.order = payload.order;
  }

  _verifyPayload(payload) {
    const { id, orderId, paymentMethod, status, amount, createdAt, order } =
      payload;

    if (
      !id ||
      !orderId ||
      !paymentMethod ||
      !status ||
      !amount ||
      !createdAt ||
      !order
    ) {
      throw new Error("DETAIL_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof orderId !== "string" ||
      typeof paymentMethod !== "string" ||
      typeof status !== "string" ||
      typeof amount !== "number" ||
      !(createdAt instanceof Date) ||
      typeof order !== "object"
    ) {
      throw new Error("DETAIL_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const validPaymentMethods = ["paypal"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      throw new Error("DETAIL_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED");
    }

    const validStatuses = ["pending", "processing", "completed", "failed"];
    if (!validStatuses.includes(status)) {
      throw new Error("DETAIL_PAYMENT.STATUS_NOT_VALID");
    }

    if (
      payload.paypalTransactionId &&
      typeof payload.paypalTransactionId !== "string"
    ) {
      throw new Error(
        "DETAIL_PAYMENT.PAYPAL_TRANSACTION_ID_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }

    const { userId, productId, quantity, totalAmount } = order;
    if (!userId || !productId || !quantity || !totalAmount) {
      throw new Error("DETAIL_PAYMENT.ORDER_NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number" ||
      typeof totalAmount !== "number"
    ) {
      throw new Error("DETAIL_PAYMENT.ORDER_NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DetailPayment;
