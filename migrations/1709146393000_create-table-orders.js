/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("orders", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    product_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    quantity: {
      type: "INTEGER",
      notNull: true,
    },
    status: {
      type: "VARCHAR(20)",
      notNull: true,
      default: "pending",
    },
    total_amount: {
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
    "orders",
    "fk_orders.user_id_users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE"
  );

  pgm.addConstraint(
    "orders",
    "fk_orders.product_id_products.id",
    "FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("orders");
};
