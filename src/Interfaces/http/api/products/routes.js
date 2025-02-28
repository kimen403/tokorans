const routes = (handler) => [
  {
    method: "POST",
    path: "/products",
    handler: handler.postProductHandler,
    options: {
      auth: "forum_jwt",
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
      auth: "forum_jwt",
    },
  },
  {
    method: "GET",
    path: "/products",
    handler: handler.getProductsHandler,
  },
];

module.exports = routes;
