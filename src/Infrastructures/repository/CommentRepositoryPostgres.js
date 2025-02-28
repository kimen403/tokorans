const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment) {
    const { content, threadId, owner } = newComment;

    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, false) RETURNING id, content, owner',
      values: [id, content, owner, threadId, date],
    };

    const { rows } = await this._pool.query(query);

    return rows[0];
  }

  async getCommentsByThreadId(thread_id) {
    const query = {
      text: 'SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete FROM comments INNER JOIN users ON comments.owner = users.id WHERE comments.thread_id = $1 ORDER BY comments.date ASC',
      values: [thread_id],
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async verifyCommentOwner(commentId, ownerId) {

    const query = {
      text: 'SELECT 1 FROM comments WHERE id = $1 AND owner = $2',
      values: [commentId, ownerId],
    };

    const { rowCount } = await this._pool.query(query);
    //cek apakah ada row yang di return

    if (!rowCount) {
      throw new AuthorizationError(
        'Anda tidak berhak mengakses resource ini',
      );
    }
    return true;
  }

  async deleteCommentById({ commentId, threadId }) {
    const query = {
      text: 'UPDATE comments SET is_delete = TRUE WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId],
    };

    const { rowCount } = await this._pool.query(query);
    
    if (!rowCount) {
      throw new NotFoundError('Komentar tidak ditemukan');
    }
    const status = 'success!';
    return status;
  }

  async verifyCommentAvailable(commentId) {
    const query = {
      text: 'SELECT 1 FROM comments WHERE id = $1 AND is_delete = FALSE',
      values: [commentId],
    };

    const { rowCount } = await this._pool.query(query);
    //cek apakah ada row yang di return
    if (!rowCount) {
      throw new NotFoundError('Komentar tidak ditemukan');
    }
    return true;
  }
}

module.exports = CommentRepositoryPostgres;
