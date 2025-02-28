const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AddedPayment = require("../../Domains/payments/entities/AddedPayment");
const PaymentRepository = require("../../Domains/payments/PaymentRepository");

class PaymentRepositoryPostgres extends PaymentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addPayment(newPayment) {
    const { orderId, paymentMethod, amount } = newPayment;
    const id = `payment-${this._idGenerator()}`;
    const status = "pending";
    const createdAt = new Date().toISOString();

    const query = {
      text: "INSERT INTO payments VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, order_id, payment_method, status, paypal_transaction_id, amount, created_at",
      values: [id, orderId, paymentMethod, status, null, amount, createdAt],
    };

    const result = await this._pool.query(query);

    return new AddedPayment({
      id: result.rows[0].id,
      orderId: result.rows[0].order_id,
      paymentMethod: result.rows[0].payment_method,
      status: result.rows[0].status,
      paypalTransactionId: result.rows[0].paypal_transaction_id,
      amount: result.rows[0].amount,
    });
  }

  async getPaymentByOrderId(orderId) {
    const query = {
      text: "SELECT id, order_id, payment_method, status, paypal_transaction_id, amount, created_at FROM payments WHERE order_id = $1",
      values: [orderId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("pembayaran tidak ditemukan");
    }

    return {
      id: result.rows[0].id,
      orderId: result.rows[0].order_id,
      paymentMethod: result.rows[0].payment_method,
      status: result.rows[0].status,
      paypalTransactionId: result.rows[0].paypal_transaction_id,
      amount: result.rows[0].amount,
      createdAt: result.rows[0].created_at,
    };
  }

  async updatePaymentStatus(orderId, status, paypalTransactionId = null) {
    const query = {
      text: "UPDATE payments SET status = $1, paypal_transaction_id = $2 WHERE order_id = $3 RETURNING id",
      values: [status, paypalTransactionId, orderId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("pembayaran tidak ditemukan");
    }
  }

  async verifyPaymentOwner(paymentId, userId) {
    const query = {
      text: `
        SELECT 1 FROM payments p
        INNER JOIN orders o ON p.order_id = o.id
        WHERE p.id = $1 AND o.user_id = $2
      `,
      values: [paymentId, userId],
    };

    const result = await this._pool.query(query);
    return result.rowCount > 0;
  }

  async getPaymentsByUserId(userId) {
    const query = {
      text: `
        SELECT p.id, p.order_id, p.payment_method, p.status, 
               p.paypal_transaction_id, p.amount, p.created_at
        FROM payments p
        INNER JOIN orders o ON p.order_id = o.id
        WHERE o.user_id = $1
        ORDER BY p.created_at DESC
      `,
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => ({
      id: row.id,
      orderId: row.order_id,
      paymentMethod: row.payment_method,
      status: row.status,
      paypalTransactionId: row.paypal_transaction_id,
      amount: row.amount,
      createdAt: row.created_at,
    }));
  }
}

module.exports = PaymentRepositoryPostgres;
