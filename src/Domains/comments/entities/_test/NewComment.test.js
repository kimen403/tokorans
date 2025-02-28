const NewComment = require('../NewComment');

describe('a NewComment entities', () => {
    it('should throw error when payload not contain needed property', () => {
        const payload = {
            content: 'content',
        };
        expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });
    it('should throw error when payload not meet data type spesification', () => {
        const payload = {
            content: 'comment',
            threadId: 123,
            owner: 123,
        };
        expect(() => new NewComment(payload)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_SPESIFICATION');
    });
    it('should success create NewComment Object ', () => {
        const payload = {
            content: 'sebuah comment',
            threadId: 'thread-123',
            owner: 'user-123',
        };
        const { content, threadId, owner } = new NewComment(payload);
        expect(content).toEqual(payload.content);
        expect(threadId).toEqual(payload.threadId);
        expect(owner).toEqual(payload.owner);
    });
});
