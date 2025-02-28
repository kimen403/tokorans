const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");

class DeleteProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const { productId, ownerId } = useCasePayload;

    const isOwner = await this._productRepository.verifyProductOwner(
      productId,
      ownerId
    );

    if (!isOwner) {
      throw new AuthorizationError("anda tidak berhak mengakses resource ini");
    }

    await this._productRepository.deleteProductById(productId);
  }
}

module.exports = DeleteProductUseCase;
