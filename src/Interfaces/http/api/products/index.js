const ProductsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "products",
  register: async (server, { container }) => {
    const productsHandler = new ProductsHandler(container);
    server.route(routes(productsHandler));
  },
};
