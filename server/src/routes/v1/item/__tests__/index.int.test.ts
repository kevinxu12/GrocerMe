/**
 * TO DO - The testing for the entire project should be more robust
 */
 jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

 import app from '@src/app';
 import supertest from 'supertest';
 import { setUpDb } from '@src/database/test/testDb';
 

 describe('Items basic route', () => {
    const request = supertest(app);
    setUpDb();
    it('Test all item requests. Should return 0, because we fetch only unaccepted requests', async () => {
        const endpoint = '/api/allItemRequests';
        const response = await request.get(endpoint);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
    });
});