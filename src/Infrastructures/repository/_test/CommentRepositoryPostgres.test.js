const CommentsTableTestHelper = require("../../../../tests/CommentTestTableHelper");
const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const NewComment = require("../../../Domains/comments/entities/NewComment");
const pool = require("../../database/postgres/pool");
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");

describe('Comment Repository Postgres', () => {
    afterEach(async () => {
        await CommentsTableTestHelper.cleanTable();
        await ThreadTableTestHelper.cleanTable();
        await UsersTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addComment function', () => {
        it('should persist new comment and return added comment correctly', async () => {
            //Arrange
            await UsersTableTestHelper.addUser({
                id: 'user-123',
                username: 'dicoding',
                password: 'secret_password',
                fullname: 'Dicoding Indonesia',
            });
            await ThreadTableTestHelper.addThread('');

            const newComment = new NewComment({
                content: 'Dicoding Indonesia adalah platform belajar pemrograman online terbaik di Indonesia',
                owner: 'user-123',
                threadId: 'thread-123',
            });

            const fakeIdGenerator = () => '321';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            //Action
            const addedComment = await commentRepositoryPostgres.addComment(newComment);

            //Assert
            const comments = await CommentsTableTestHelper.getCommentById('comment-321');

            expect(addedComment).toStrictEqual(
                ({
                    id: 'comment-321',
                    content: newComment.content,
                    owner: newComment.owner,
                }),
            );
            expect(comments).toHaveLength(1);
        });
    });
    describe('getCommentsByThreadId function', () => {
        it('should persist getComment and return ', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            const comments = await commentRepositoryPostgres.getCommentsByThreadId('thread-123');


            expect(comments).toStrictEqual(
                [{
                    id: 'comment-123',
                    username: 'dicoding',
                    date: '2023-04-07T07:12:01.430Z',
                    is_delete: false,
                    content: 'some comment',
                }],
            );

        });
    });
    describe('deleteCommentById function', () => {
        it('should throw AuthErorr', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});

            const commentId = 'comment-123';
            const ownerId = 'user-321';

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentRepositoryPostgres.verifyCommentOwner(commentId, ownerId)).rejects.toThrowError(AuthorizationError);
        }
        );
        it('should throw NotFoundError', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});
            const commentId = 'comment-32';
            const ownerId = 'user-123';

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            UseCasePayload = {
                commentId,
                ownerId,
            };

            await expect(commentRepositoryPostgres.deleteCommentById(UseCasePayload)).rejects.toThrowError('Komentar tidak ditemukan');
        });

        it('should persist deleteComment and return ', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            const UseCasePayload = {
                commentId: 'comment-123',
                threadId: 'thread-123',
            };

            const comments = await commentRepositoryPostgres.deleteCommentById(UseCasePayload);
            const is_deleteComment = await CommentsTableTestHelper.getCommentById(UseCasePayload.commentId)
            expect(is_deleteComment).toHaveLength(1);
            expect(is_deleteComment[0].is_delete).toBe(true)
            expect(comments).toStrictEqual('success!');
        });
    });
    describe('verifyCommentOwner function', () => {
        it('should throw AuthErorr', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});

            const commentId = 'comment-123';
            const ownerId = 'user-321';

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentRepositoryPostgres.verifyCommentOwner(commentId, ownerId)).rejects.toThrowError(AuthorizationError);
        }
        ); 

        it('should persist verifyCommentOwner and return ', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            
            const commentId= 'comment-123';
            const userId= 'user-123';
        

            const comments = await commentRepositoryPostgres.verifyCommentOwner(commentId, userId);

            expect(comments).toBe(true);
        });
    });  
    describe('verifyCommentAvailable function', () => {
        it('should throw NotFoundError', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});
            const commentId = 'comment-32';

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await expect(commentRepositoryPostgres.verifyCommentAvailable(commentId)).rejects.toThrowError('Komentar tidak ditemukan');
        });

        it('should persist verifyCommentAvailable and return ', async () => {
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            await CommentsTableTestHelper.addComment({});

            fakeIdGenerator = () => '123';
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            const commentId= 'comment-123';

            const comments = await commentRepositoryPostgres.verifyCommentAvailable(commentId);

            expect(comments).toBe(true);
        });
    });

});


