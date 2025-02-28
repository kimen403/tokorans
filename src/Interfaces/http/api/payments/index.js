const PaymentsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "payments",
  register: async (server, { container }) => {
    const paymentsHandler = new PaymentsHandler(container);
    server.route(routes(paymentsHandler));
  },
};
