const InvitationRepository = require("../../Domains/invitation/InvitationRepository");

class InvitationRepositoryPostgres extends InvitationRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }
  async get() {
    const query = {
      text: `SELECT * FROM invitations`,
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
  async post({ name, content, message }) {
    const id = `invitation-${this._idGenerator()}`;
    console.log("masuk repository");
    const query = {
      text: `INSERT INTO invitations(name, content, message) VALUES($1, $2, $3) RETURNING id, name, content, message`,
      values: [name, content, message],
    };
    try {
      console.log("masuk try");
      const result = await this._pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

module.exports = InvitationRepositoryPostgres;
