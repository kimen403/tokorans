//NOTE - belum di jalan kan , ganti nama file nya yaa

const CommentRepository = require('../CommentRepository');

describe('a CommentRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        const commentRepository = new CommentRepository();

        await expect(
            commentRepository.addComment({}),
        ).rejects.toThrowError(
            'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED',
        );
        await expect(
            commentRepository.verifyCommentOwner('', ''),
        ).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(
            commentRepository.deleteCommentById('', ''),
        ).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(
            commentRepository.getCommentsByThreadId(''),
        ).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(
            commentRepository.verifyCommentAvailable(''),
        ).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});
