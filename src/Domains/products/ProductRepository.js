class ProductRepository {
  async addProduct(newProduct) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getProductById(id) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyProductOwner(productId, ownerId) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteProductById(id) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getProducts() {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = ProductRepository;
