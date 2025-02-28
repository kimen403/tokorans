class AddedOrder {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.userId = payload.userId;
    this.productId = payload.productId;
    this.quantity = payload.quantity;
    this.status = payload.status;
    this.totalAmount = payload.totalAmount;
  }

  _verifyPayload(payload) {
    const { id, userId, productId, quantity, status, totalAmount } = payload;

    if (!id || !userId || !productId || !quantity || !status || !totalAmount) {
      throw new Error("ADDED_ORDER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number" ||
      typeof status !== "string" ||
      typeof totalAmount !== "number"
    ) {
      throw new Error("ADDED_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const validStatuses = ["pending", "processing", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new Error("ADDED_ORDER.STATUS_NOT_VALID");
    }
  }
}

module.exports = AddedOrder;
