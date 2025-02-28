class NewOrder {
  constructor(payload) {
    this._verifyPayload(payload);

    this.userId = payload.userId;
    this.productId = payload.productId;
    this.quantity = payload.quantity;
    this.totalAmount = payload.totalAmount;
  }

  _verifyPayload(payload) {
    const { userId, productId, quantity, totalAmount } = payload;

    if (!userId || !productId || !quantity || !totalAmount) {
      throw new Error("NEW_ORDER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number" ||
      typeof totalAmount !== "number"
    ) {
      throw new Error("NEW_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (quantity <= 0) {
      throw new Error("NEW_ORDER.QUANTITY_MUST_BE_POSITIVE");
    }

    if (totalAmount <= 0) {
      throw new Error("NEW_ORDER.TOTAL_AMOUNT_MUST_BE_POSITIVE");
    }
  }
}

module.exports = NewOrder;
