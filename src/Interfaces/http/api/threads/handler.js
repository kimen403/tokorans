/* eslint-disable linebreak-style */
const AddThreadUseCase = require("../../../../Applications/use_case/ThreadUseCase/AddThreadUseCase");
const GetDetailThreadByIdUseCase = require("../../../../Applications/use_case/ThreadUseCase/GetDetailThreadByIdUseCase");

class ThreadHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
  }

  async postThreadHandler({ payload, auth }, h) {
    const usecasePayload = {
      title: payload.title,
      body: payload.body,
      owner: auth.credentials.id,
    };

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(usecasePayload);

    const response = h.response({
      status: "success",
      message: "Thread berhasil ditambahkan",
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getThreadByIdHandler(request, h) {
    const getDetailThreadByIdUseCase = this._container.getInstance(
      GetDetailThreadByIdUseCase.name
    );
    // console.log('masuk getThreadByIdHandler')
    const thread = await getDetailThreadByIdUseCase.execute(request.params.threadId);

    const response = h.response({
      status: "success",
      data: {
        thread,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadHandler;
