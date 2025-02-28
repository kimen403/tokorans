const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const DeleteCommentUseCase = require("../DeleteCommentUseCase");

describe('Delete Comment Use Case', () => {
    it('should orchestrating the delete comment action correctly', async () => {
        // Arrange
        const useCasePayload = {
            commentId: 'comment-123',
            threadId: 'thread-123',
        };
        const owner = 'user-123';

        const mockCommentRepository = new CommentRepository();
        mockCommentRepository.verifyCommentAvailable = jest.fn().mockImplementation(() => Promise.resolve(true));
        mockCommentRepository.verifyCommentOwner = jest.fn().mockImplementation(() => Promise.resolve(true));
        mockCommentRepository.deleteCommentById = jest.fn().mockImplementation(() => Promise.resolve('success!'));
        const deleteCommentUseCase = new DeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });

        const expectedDeletedComment = {
            status: 'success',
        };

        // Action
        const deleteComment = await deleteCommentUseCase.execute(owner, useCasePayload);

        // Assert

        expect(deleteComment).toStrictEqual(expectedDeletedComment);
        
        expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(useCasePayload.commentId, owner);

        expect(mockCommentRepository.verifyCommentAvailable).toBeCalledWith(useCasePayload.commentId);

        expect(mockCommentRepository.deleteCommentById).toBeCalledWith(useCasePayload);
    });

});