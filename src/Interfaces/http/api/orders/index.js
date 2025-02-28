const OrdersHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "orders",
  register: async (server, { container }) => {
    const ordersHandler = new OrdersHandler(container);
    server.route(routes(ordersHandler));
  },
};
