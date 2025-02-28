const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AddedOrder = require("../../Domains/orders/entities/AddedOrder");
const OrderRepository = require("../../Domains/orders/OrderRepository");

class OrderRepositoryPostgres extends OrderRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addOrder(newOrder) {
    const { userId, productId, quantity, totalAmount } = newOrder;
    const id = `order-${this._idGenerator()}`;
    const status = "pending";
    const createdAt = new Date().toISOString();

    const query = {
      text: "INSERT INTO orders VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, user_id, product_id, quantity, status, total_amount, created_at",
      values: [id, userId, productId, quantity, status, totalAmount, createdAt],
    };

    const result = await this._pool.query(query);

    return new AddedOrder({
      id: result.rows[0].id,
      userId: result.rows[0].user_id,
      productId: result.rows[0].product_id,
      quantity: result.rows[0].quantity,
      status: result.rows[0].status,
      totalAmount: result.rows[0].total_amount,
    });
  }

  async getOrderById(id) {
    const query = {
      text: "SELECT id, user_id, product_id, quantity, status, total_amount, created_at FROM orders WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("order tidak ditemukan");
    }

    return {
      id: result.rows[0].id,
      userId: result.rows[0].user_id,
      productId: result.rows[0].product_id,
      quantity: result.rows[0].quantity,
      status: result.rows[0].status,
      totalAmount: result.rows[0].total_amount,
      createdAt: result.rows[0].created_at,
    };
  }

  async getOrdersByUserId(userId) {
    const query = {
      text: "SELECT id, user_id, product_id, quantity, status, total_amount, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      productId: row.product_id,
      quantity: row.quantity,
      status: row.status,
      totalAmount: row.total_amount,
      createdAt: row.created_at,
    }));
  }

  async verifyOrderOwner(orderId, userId) {
    const query = {
      text: "SELECT 1 FROM orders WHERE id = $1 AND user_id = $2",
      values: [orderId, userId],
    };

    const result = await this._pool.query(query);
    return result.rowCount > 0;
  }

  async updateOrderStatus(orderId, status) {
    const query = {
      text: "UPDATE orders SET status = $1 WHERE id = $2 RETURNING id",
      values: [status, orderId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("order tidak ditemukan");
    }
  }
}

module.exports = OrderRepositoryPostgres;
