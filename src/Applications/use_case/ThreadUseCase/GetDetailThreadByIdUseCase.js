const DetailThread = require("../../../Domains/threads/entities/DetailThread");

class GetDetailThreadByIdUseCase {
    constructor({ threadRepository, commentRepository }) {
        this._threadRepository = threadRepository;
        this._commentRepository = commentRepository;
    }

    //UseCasePayload = { threadId: string }
    async execute(useCasePayload) {
        // console.log('masuk getDetailThreadByIdUseCase')
        let thread = await this._threadRepository.getThreadById(useCasePayload);

        const comment = await this._commentRepository.getCommentsByThreadId(useCasePayload);
        
        const mapingComment = comment.map((item) => {
            const isContentDeleted = item.is_delete;
            return {
                id: item.id,
                username: item.username,
                date: item.date,
                content: isContentDeleted ? "**komentar telah dihapus**" : item.content,
            };
        });
        // console.log(comment);
        thread.comments = mapingComment;
        
        return new DetailThread(thread);
    }
}

module.exports = GetDetailThreadByIdUseCase;