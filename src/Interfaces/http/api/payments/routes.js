const routes = (handler) => [
  {
    method: "POST",
    path: "/payments/paypal/webhook",
    handler: handler.postPaypalWebhookHandler,
    options: {
      auth: false, // Webhook dari PayPal tidak memerlukan authentikasi
      payload: {
        parse: true,
        output: "data",
      },
    },
  },
];

module.exports = routes;
