/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable("products", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    name: {
      type: "TEXT",
      notNull: true,
    },
    price: {
      type: "NUMERIC",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    image_url: {
      type: "TEXT",
      notNull: true,
    },
    owner_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint(
    "products",
    "fk_products.owner_id_users.id",
    "FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("products");
};
