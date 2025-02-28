class DetailOrder {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.userId = payload.userId;
    this.productId = payload.productId;
    this.quantity = payload.quantity;
    this.status = payload.status;
    this.totalAmount = payload.totalAmount;
    this.createdAt = payload.createdAt;
    this.product = payload.product;
    this.payment = payload.payment;
  }

  _verifyPayload(payload) {
    const {
      id,
      userId,
      productId,
      quantity,
      status,
      totalAmount,
      createdAt,
      product,
      payment,
    } = payload;

    if (
      !id ||
      !userId ||
      !productId ||
      !quantity ||
      !status ||
      !totalAmount ||
      !createdAt ||
      !product
    ) {
      throw new Error("DETAIL_ORDER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number" ||
      typeof status !== "string" ||
      typeof totalAmount !== "number" ||
      !(createdAt instanceof Date) ||
      typeof product !== "object"
    ) {
      throw new Error("DETAIL_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const validStatuses = ["pending", "processing", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new Error("DETAIL_ORDER.STATUS_NOT_VALID");
    }

    if (payment && typeof payment !== "object") {
      throw new Error("DETAIL_ORDER.PAYMENT_NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const { name, price, imageUrl } = product;
    if (!name || !price || !imageUrl) {
      throw new Error("DETAIL_ORDER.PRODUCT_NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof imageUrl !== "string"
    ) {
      throw new Error("DETAIL_ORDER.PRODUCT_NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DetailOrder;
