class RegisteredUser {
  constructor(payload) {
    this._verifyPayload(payload);
    this.id = payload.id;
    this.username = payload.username;
    this.fullname = payload.fullname;
  }

  _verifyPayload({ id, username, fullname }) {
    if (!id || !username || !fullname) {
      throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredUser;
