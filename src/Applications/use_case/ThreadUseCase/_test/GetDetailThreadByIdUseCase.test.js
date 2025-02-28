const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const DetailThread = require("../../../../Domains/threads/entities/DetailThread");
const GetDetailThreadByIdUseCase = require("../GetDetailThreadByIdUseCase");


describe('GetDetailThreadByIdUseCase', () => {
    it('should orchestrating the Get detail thread By Id action correctly ', async () => {
        //Arrange
        const useCasePayload = 'thread-123';

        const expectedDetailThread = new DetailThread({
            id: 'thread-123',
            title: 'sebuah thread',
            body: 'ini adalah isi thread',
            date: '2023-04-07T07:12:01.430Z',
            username: 'dicoding',
            comments: [
                {
                    id: 'comment-123',
                    username: 'dicoding',
                    date: '2023-04-07T07:12:01.430Z',
                    content: '**komentar telah dihapus**',
                },
                {
                    id: 'comment-123',
                    username: 'dicoding',
                    date: '2023-04-07T07:12:01.430Z',
                    content: 'ini adalah isi komentar',
                },
            ],
        });

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockCommentRepository.getCommentsByThreadId = jest.fn().mockImplementation(() => Promise.resolve([
            {
                id: 'comment-123',
                username: 'dicoding',
                date: expectedDetailThread.date,
                is_delete: true,
                content: 'ini adalah isi komentar',
            },
            {
                id: 'comment-123',
                username: 'dicoding',
                date: expectedDetailThread.date,
                is_delete: false,
                content: 'ini adalah isi komentar'
            }
        ]));

        mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve({
            id: 'thread-123',
            title: 'sebuah thread',
            body: 'ini adalah isi thread',
            date: expectedDetailThread.date,
            username: 'dicoding',
        })
        );

        const getDetailThreadByIdUseCase = new GetDetailThreadByIdUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        //Action
        const detailThread = await getDetailThreadByIdUseCase.execute(useCasePayload);

        //Assert

        expect(detailThread).toStrictEqual(expectedDetailThread);

        expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload);

        expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(useCasePayload);
    });
});