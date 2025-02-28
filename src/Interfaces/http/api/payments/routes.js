const routes = (handler) => [
  {
    method: "POST",
    path: "/payments/paypal/webhook",
    handler: handler.postPaypalWebhookHandler,
    options: {
      auth: false,
      payload: {
        parse: true,
        output: "data",
      },
    },
  },
];

module.exports = routes;
