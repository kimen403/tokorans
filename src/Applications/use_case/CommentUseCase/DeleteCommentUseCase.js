const DeleteComment = require("../../../Domains/comments/entities/DeleteComent");

class DeleteCommentUseCase {
    constructor({ commentRepository }) {
        this._commentRepository = commentRepository;
    }

    async execute(owner, useCasePayload) {
        const deleteComment = new DeleteComment(useCasePayload);
        await this._commentRepository.verifyCommentAvailable(deleteComment.commentId);
        await this._commentRepository.verifyCommentOwner(deleteComment.commentId, owner);
        await this._commentRepository.deleteCommentById(deleteComment);

        return {
            status: 'success',
        };
    }
}

module.exports = DeleteCommentUseCase;