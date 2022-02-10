/**
 * @file Integration Test
 */
jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

import app from '@src/app';
import supertest from 'supertest';
import { setUpDb } from '@src/database/test/testDb';


describe('Login basic route', () => {
    const endpoint = '/api/allSupplierRequests';
    const request = supertest(app);
    setUpDb();
    it('Should send error when empty body is sent', async () => {
        const response = await request.get(endpoint);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    });
});

