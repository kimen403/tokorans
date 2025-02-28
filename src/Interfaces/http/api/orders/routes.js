const routes = (handler) => [
  {
    method: "POST",
    path: "/orders",
    handler: handler.postOrderHandler,
    options: {
      auth: "tokorantau",
    },
  },
  {
    method: "GET",
    path: "/orders/{id}",
    handler: handler.getOrderByIdHandler,
    options: {
      auth: "tokorantau",
    },
  },
];

module.exports = routes;
