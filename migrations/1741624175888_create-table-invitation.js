/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("invitations", {
    id: "id",
    name: { type: "varchar(25)", notNull: true },
    content: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    message: { type: "text" },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("invitations");
};
