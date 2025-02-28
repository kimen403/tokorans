const routes = (handler) => [
  {
    method: "POST",
    path: "/products",
    handler: handler.postProductHandler,
    options: {
      auth: "tokorantau",
    },
  },
  {
    method: "GET",
    path: "/products/{id}",
    handler: handler.getProductByIdHandler,
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    handler: handler.deleteProductHandler,
    options: {
      auth: "tokorantau",
    },
  },
];

module.exports = routes;
