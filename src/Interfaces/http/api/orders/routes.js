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
  {
    method: "POST",
    path: "/orders/{id}/payments/paypal",
    handler: handler.createPaypalPaymentHandler,
    options: {
      auth: "tokorantau",
    },
  },
];

module.exports = routes;
