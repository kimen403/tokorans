const DetailProduct = require("../../../Domains/products/entities/DetailProduct");

class GetProductDetailUseCase {
  constructor({ productRepository, userRepository }) {
    this._productRepository = productRepository;
    this._userRepository = userRepository;
  }

  async execute(productId) {
    const product = await this._productRepository.getProductById(productId);
    const owner = await this._userRepository.getUserById(product.ownerId);

    return new DetailProduct({
      ...product,
      owner: {
        id: owner.id,
        username: owner.username,
      },
      createdAt: new Date(product.createdAt),
    });
  }
}

module.exports = GetProductDetailUseCase;
