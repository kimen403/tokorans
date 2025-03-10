const routes = require("./routes");
const InvitationHandler = require("./handler");

module.exports = {
  name: "Invitation",
  version: "1.0.0",
  register: async (server, { container }) => {
    const invitationHandler = new InvitationHandler(container);
    server.route(routes(invitationHandler));
  },
};
