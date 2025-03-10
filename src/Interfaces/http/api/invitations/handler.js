// const AddCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/AddCommentUseCase");
// const DeleteCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/DeleteCommentUseCase");

const invitations = require(".");
const InvitationUseCase = require("../../../../Applications/use_case/invitationUseCase/invitationUseCase");

class InvitationHandler {
  constructor(container) {
    this._container = container;
    this.postInvitationHandler = this.postInvitationHandler.bind(this);
    this.getInvitationHandler = this.getInvitationHandler.bind(this);
  }

  async postInvitationHandler(request, h) {
    const { name, content, message } = request.payload;
    console.log(name, content, message);
    const invitationUseCase = this._container.getInstance(
      InvitationUseCase.name
    );
    await invitationUseCase.post({
      name,
      content,
      message,
    });
    const response = h.response({
      status: "success",
      message: "Invitation berhasil ditambahkan",
    });
    response.code(201);
    return response;
  }

  async getInvitationHandler() {
    const getCommentUseCase = this._container.getInstance(
      InvitationUseCase.name
    );
    const invitations = await getCommentUseCase.get();
    return {
      status: "success",
      data: {
        invitations,
      },
    };
  }
}
module.exports = InvitationHandler;
