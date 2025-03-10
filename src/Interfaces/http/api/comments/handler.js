const AddCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/AddCommentUseCase");
const DeleteCommentUseCase = require("../../../../Applications/use_case/CommentUseCase/DeleteCommentUseCase");

class CommentsHandler {
  constructor(container) {
    this._container = container;
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    this.postUndanganEmmaHandler = this.postUndanganEmmaHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const usecasePayload = {
      content: request.payload.content,
      threadId: request.params.threadId,
      owner: request.auth.credentials.id,
    };

    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name
    );
    const addedComment = await addCommentUseCase.execute(usecasePayload);

    const response = h.response({
      status: "success",
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }
  async deleteCommentHandler(request, h) {
    const usecasePayload = {
      commentId: request.params.commentId,
      threadId: request.params.threadId,
    };
    const owner = request.auth.credentials.id;
    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name
    );
    const deleteComment = await deleteCommentUseCase.execute(
      owner,
      usecasePayload
    );

    const response = h.response(deleteComment);
    response.code(200);
    return response;
  }
  async postUndanganEmmaHandler(request, h) {
    const data = request.payload;
    console.log(data);
    const email = "rizkyfirmaan17@gmail.com";
    const mailSender = this._container.getInstance("MailSender");
    console.log("mailsender jalan", mailSender.sendEmail);
    await mailSender.sendEmail(email, "Undangan Emma");
    console.log("mailsender jalan");
    const response = h.response({
      status: "success",
      message: "Permintaan Anda sedang kami proses",
    });
    response.code(201);
    return response;
  }
}

module.exports = CommentsHandler;
