// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class InvitationUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ invitationRepository }) {
    this._invitationRepository = invitationRepository;
    // // this._threadRepository= threadRepository;
  }

  async get() {
    return this._invitationRepository.get();
  }
  async post(useCasePayload) {
    return this._invitationRepository.post(useCasePayload);
  }
}

module.exports = InvitationUseCase;
