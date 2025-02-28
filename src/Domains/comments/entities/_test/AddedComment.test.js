const AddedComment = require('../AddedComment');

describe('a AddedComment entities', () => {
    it('should throw error when payload not contain needed property', () => {
        const payload = {
            id: 'id-123',
            content: 'content',
        };
        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });


    it('should throw error when payload not meet data type spesification', () => {
        const payload = {
            id: 'comment-123',
            content: 'sebuah comment',
            thread_id: 'thread-123',
            owner: 123,
        };
        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_SPESIFICATION');
    });


    it('should success create AddedComment Object ', () => {
        const payload = {
            id: 'comment-123',
            content: 'sebuah comment',
            thread_id: 'thread-123',
            owner: 'user-123',
        };

        const {
            id, content, thread_id, owner,
        } = new AddedComment(payload);
        
        expect(id).toEqual(payload.id);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
    });
});
