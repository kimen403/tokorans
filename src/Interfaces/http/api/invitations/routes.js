const routes = (handler) => [
  {
    method: "GET",
    path: "/invitations",
    handler: handler.getInvitationHandler,
    options: {
      auth: "tokorantau",
    },
  },
  {
    method: "POST",
    path: "/invitations",
    handler: handler.postInvitationHandler,
  },
];

module.exports = routes;
