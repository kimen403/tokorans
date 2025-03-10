const routes = (handler) => [
  {
    method: "POST",
    path: "/threads/{threadId}/comments",
    handler: handler.postCommentHandler,
    options: {
      auth: "tokorantau",
    },
  },
  {
    method: "DELETE",
    path: "/threads/{threadId}/comments/{commentId}",
    handler: handler.deleteCommentHandler,
    options: {
      auth: "tokorantau",
    },
  },
  {
    method: "POST",
    path: "/undanganemma",
    handler: handler.postUndanganEmmaHandler,
  },
];

module.exports = routes;
