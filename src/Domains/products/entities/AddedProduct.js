class AddedProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.name = payload.name;
    this.price = payload.price;
    this.description = payload.description;
    this.imageUrl = payload.imageUrl;
    this.ownerId = payload.ownerId;
  }

  _verifyPayload(payload) {
    const { id, name, price, description, imageUrl, ownerId } = payload;

    if (!id || !name || !price || !description || !imageUrl || !ownerId) {
      throw new Error("ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string" ||
      typeof ownerId !== "string"
    ) {
      throw new Error("ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddedProduct;
