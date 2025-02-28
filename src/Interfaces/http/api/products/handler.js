const AddProductUseCase = require("../../../../Applications/use_case/ProductUseCase/AddProductUseCase");
const DeleteProductUseCase = require("../../../../Applications/use_case/ProductUseCase/DeleteProductUseCase");
const GetProductDetailUseCase = require("../../../../Applications/use_case/ProductUseCase/GetProductDetailUseCase");
const GetProductsUseCase = require("../../../../Applications/use_case/ProductUseCase/GetProductsUseCase");

class ProductsHandler {
  constructor(container) {
    this._container = container;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.deleteProductHandler = this.deleteProductHandler.bind(this);
    this.getProductsHandler = this.getProductsHandler.bind(this);
  }

  async postProductHandler(request, h) {
    const addProductUseCase = this._container.getInstance(
      AddProductUseCase.name
    );
    const { id: ownerId } = request.auth.credentials;

    const useCasePayload = {
      name: request.payload.name,
      price: request.payload.price,
      description: request.payload.description,
      imageUrl: request.payload.imageUrl,
      ownerId,
    };

    const addedProduct = await addProductUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      data: {
        addedProduct,
      },
    });
    response.code(201);
    return response;
  }

  async getProductByIdHandler(request) {
    const getProductDetailUseCase = this._container.getInstance(
      GetProductDetailUseCase.name
    );
    const { id } = request.params;

    const product = await getProductDetailUseCase.execute(id);

    return {
      status: "success",
      data: {
        product,
      },
    };
  }

  async deleteProductHandler(request) {
    const deleteProductUseCase = this._container.getInstance(
      DeleteProductUseCase.name
    );
    const { id } = request.params;
    const { id: ownerId } = request.auth.credentials;

    await deleteProductUseCase.execute({ productId: id, ownerId });

    return {
      status: "success",
      message: "produk berhasil dihapus",
    };
  }

  async getProductsHandler() {
    const getProductsUseCase = this._container.getInstance(
      GetProductsUseCase.name
    );
    const { products } = await getProductsUseCase.execute();

    return {
      status: "success",
      data: {
        products,
      },
    };
  }
}

module.exports = ProductsHandler;
