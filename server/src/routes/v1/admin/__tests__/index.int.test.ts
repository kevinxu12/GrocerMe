/**
 * @file Integration Tests for Admin
 * @author Kevin Xu
 */
jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

import app from '@src/app';
import supertest from 'supertest';
import { setUpDb } from '@src/database/test/testDb';
import { mockUser_1 } from '@src/repository/mocks/data';
import { RequestStatus } from '@src/helpers/model';
import UserRepo from '@src/repository/UserRepo';


describe('Login basic route', () => {
    const request = supertest(app);
    setUpDb();
    it('Test all supplier requests', async () => {
        const endpoint = '/api/allSupplierRequests';
        const response = await request.get(endpoint);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    });
    it('Test accept supplier requests', async () => {
        const endpoint = '/api/acceptSupplierRequest';
        const response = await request.post(endpoint).send({email: mockUser_1.email});
        const modifiedRequest = response.body.data;
        const user = await UserRepo.findByEmail(mockUser_1.email);
        expect(response.status).toBe(200);
        expect(modifiedRequest.status).toBe(RequestStatus.ACCEPTED);
        expect(user).not.toBeNull();
        expect(user?.roles.length).toBe(1);
    });
});

