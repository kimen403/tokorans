class NewProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    this.name = payload.name;
    this.price = payload.price;
    this.description = payload.description;
    this.imageUrl = payload.imageUrl;
    this.ownerId = payload.ownerId;
  }

  _verifyPayload(payload) {
    const { name, price, description, imageUrl, ownerId } = payload;

    if (!name || !price || !description || !imageUrl || !ownerId) {
      throw new Error("NEW_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string" ||
      typeof ownerId !== "string"
    ) {
      throw new Error("NEW_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (price <= 0) {
      throw new Error("NEW_PRODUCT.PRICE_MUST_BE_POSITIVE");
    }
  }
}

module.exports = NewProduct;
