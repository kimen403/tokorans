/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("payments", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    order_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    payment_method: {
      type: "VARCHAR(20)",
      notNull: true,
      default: "paypal",
    },
    status: {
      type: "VARCHAR(20)",
      notNull: true,
      default: "pending",
    },
    paypal_transaction_id: {
      type: "TEXT",
      notNull: false,
    },
    amount: {
      type: "NUMERIC",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint(
    "payments",
    "fk_payments.order_id_orders.id",
    "FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("payments");
};
