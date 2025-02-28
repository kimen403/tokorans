const NewProduct = require("../../../Domains/products/entities/NewProduct");

class AddProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const newProduct = new NewProduct(useCasePayload);
    return this._productRepository.addProduct(newProduct);
  }
}

module.exports = AddProductUseCase;
