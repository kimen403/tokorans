class AddedPayment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.orderId = payload.orderId;
    this.paymentMethod = payload.paymentMethod;
    this.status = payload.status;
    this.paypalTransactionId = payload.paypalTransactionId;
    this.amount = payload.amount;
  }

  _verifyPayload(payload) {
    const { id, orderId, paymentMethod, status, amount } = payload;

    if (!id || !orderId || !paymentMethod || !status || !amount) {
      throw new Error("ADDED_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof orderId !== "string" ||
      typeof paymentMethod !== "string" ||
      typeof status !== "string" ||
      typeof amount !== "number"
    ) {
      throw new Error("ADDED_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const validPaymentMethods = ["paypal"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      throw new Error("ADDED_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED");
    }

    const validStatuses = ["pending", "processing", "completed", "failed"];
    if (!validStatuses.includes(status)) {
      throw new Error("ADDED_PAYMENT.STATUS_NOT_VALID");
    }

    if (
      payload.paypalTransactionId &&
      typeof payload.paypalTransactionId !== "string"
    ) {
      throw new Error(
        "ADDED_PAYMENT.PAYPAL_TRANSACTION_ID_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = AddedPayment;
