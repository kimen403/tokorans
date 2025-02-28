class DetailProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.name = payload.name;
    this.price = payload.price;
    this.description = payload.description;
    this.imageUrl = payload.imageUrl;
    this.ownerId = payload.ownerId;
    this.createdAt = payload.createdAt;
    this.owner = payload.owner;
  }

  _verifyPayload(payload) {
    const {
      id,
      name,
      price,
      description,
      imageUrl,
      ownerId,
      createdAt,
      owner,
    } = payload;

    if (
      !id ||
      !name ||
      !price ||
      !description ||
      !imageUrl ||
      !ownerId ||
      !createdAt ||
      !owner
    ) {
      throw new Error("DETAIL_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof description !== "string" ||
      typeof imageUrl !== "string" ||
      typeof ownerId !== "string" ||
      !(createdAt instanceof Date) ||
      typeof owner !== "object"
    ) {
      throw new Error("DETAIL_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    const { username } = owner;
    if (!username || typeof username !== "string") {
      throw new Error("DETAIL_PRODUCT.OWNER_NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = DetailProduct;
