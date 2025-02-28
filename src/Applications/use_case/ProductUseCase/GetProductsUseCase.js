class GetProductsUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute() {
    const products = await this._productRepository.getProducts();
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        ownerId: product.ownerId,
        createdAt: product.createdAt,
      })),
    };
  }
}

module.exports = GetProductsUseCase;
