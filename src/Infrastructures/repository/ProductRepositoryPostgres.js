const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AddedProduct = require("../../Domains/products/entities/AddedProduct");
const ProductRepository = require("../../Domains/products/ProductRepository");

class ProductRepositoryPostgres extends ProductRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addProduct(newProduct) {
    const { name, price, description, imageUrl, ownerId } = newProduct;
    const id = `product-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: "INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, price, description, image_url, owner_id, created_at",
      values: [id, name, price, description, imageUrl, ownerId, createdAt],
    };

    const result = await this._pool.query(query);

    return new AddedProduct({
      id: result.rows[0].id,
      name: result.rows[0].name,
      price: result.rows[0].price,
      description: result.rows[0].description,
      imageUrl: result.rows[0].image_url,
      ownerId: result.rows[0].owner_id,
    });
  }

  async getProductById(id) {
    const query = {
      text: "SELECT id, name, price, description, image_url, owner_id, created_at FROM products WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("produk tidak ditemukan");
    }

    return {
      id: result.rows[0].id,
      name: result.rows[0].name,
      price: result.rows[0].price,
      description: result.rows[0].description,
      imageUrl: result.rows[0].image_url,
      ownerId: result.rows[0].owner_id,
      createdAt: result.rows[0].created_at,
    };
  }

  async verifyProductOwner(productId, ownerId) {
    const query = {
      text: "SELECT 1 FROM products WHERE id = $1 AND owner_id = $2",
      values: [productId, ownerId],
    };

    const result = await this._pool.query(query);
    return result.rowCount > 0;
  }

  async deleteProductById(id) {
    const query = {
      text: "DELETE FROM products WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("produk gagal dihapus karena id tidak ditemukan");
    }
  }

  async getProducts() {
    const query = {
      text: "SELECT id, name, price, description, image_url, owner_id, created_at FROM products ORDER BY created_at DESC",
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      price: row.price,
      description: row.description,
      imageUrl: row.image_url,
      ownerId: row.owner_id,
      createdAt: row.created_at,
    }));
  }
}

module.exports = ProductRepositoryPostgres;
