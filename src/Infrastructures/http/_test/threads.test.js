const ServerTestHelper = require("../../../../tests/ServerTestHelper");
const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const UsersTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const pool = require("../../database/postgres/pool");
const container = require('../../container');
const createServer = require('../createServer');

describe('/thread endPoint', () => {
    afterAll(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadTableTestHelper.cleanTable();
        await pool.end();
    });

    describe('when POST /thread', () => {
        it('should response 401 when request not contain Authorization', async () => {

            const requestPayload = {
                title: 'dicoding',
                body: 'dicoding',
            };

            const server = await createServer(container);
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
            });


            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(401);
            expect(responseJson.error).toEqual('Unauthorized');
            expect(responseJson.message).toEqual('Missing authentication');
        });
        it('should response 400 when request payload not meet data type specification', async () => {
            // Arrange
            const requestPayload = {
                title: 'ini ga akan jalan karena body harus string',
                body: true,
            };
            const server = await createServer(container);

            const { accessToken } = await ServerTestHelper.getAccessTokenAndUserIdHelper({ server });

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali');
        });
        it('should response 400 when request not contain needded property', async () => {

            const requestPayload = {
                title: 'dicoding',
            };

            const server = await createServer(container);
            const { accessToken } = await ServerTestHelper.getAccessTokenAndUserIdHelper({ server });

            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            //FIXME - ini harusnya fail
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena property tidak lengkap Silahkan cek kembali');
        });
        it('should response 201 and persisted thread', async () => {


            // Arrange
            const requestPayload = {
                title: 'kita mencoba membuat thread baru',
                body: 'ini adalah body thread baru yang kita buat',
            };
            const server = await createServer(container);
            const { accessToken } = await ServerTestHelper.getAccessTokenAndUserIdHelper({ server });

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/threads',
                payload: requestPayload,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            //sudah oke
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedThread).toBeDefined();
        });
    });

    describe('when GET /threads/{threadId}', () => {
        it('should response 200 and array of thread', async () => {
            // Arrange
            const threadId = 'thread-123';
            await UsersTableTestHelper.addUser({});
            await ThreadTableTestHelper.addThread({});
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/threads/${threadId}`,
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.thread).toBeDefined();
        });
    });
});