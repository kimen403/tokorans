class NewPayment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.orderId = payload.orderId;
    this.paymentMethod = payload.paymentMethod;
    this.amount = payload.amount;
  }

  _verifyPayload(payload) {
    const { orderId, paymentMethod, amount } = payload;

    if (!orderId || !paymentMethod || !amount) {
      throw new Error("NEW_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof orderId !== "string" ||
      typeof paymentMethod !== "string" ||
      typeof amount !== "number"
    ) {
      throw new Error("NEW_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const validPaymentMethods = ["paypal"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      throw new Error("NEW_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED");
    }

    if (amount <= 0) {
      throw new Error("NEW_PAYMENT.AMOUNT_MUST_BE_POSITIVE");
    }
  }
}

module.exports = NewPayment;
