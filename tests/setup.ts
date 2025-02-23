import app from '../src/server';
let server: any;

beforeAll(() => {
    server = app.listen(3001);
});

afterAll(async () => {
    await server.close();
});