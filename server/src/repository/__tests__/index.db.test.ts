/**
 * @file Integration Test for Repository methods
 * Tests that some of the methods work in the in-memory test DB
 * @author Kevin Xu
 */
 jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

 import { setUpDb } from '@src/database/test/testDb';
import AdminRepo from '../AdminRepo';
import { injectedUser, mockUser_1 } from '../mocks/data';
import { RequestStatus } from '@src/helpers/model';
import UserRepo from '../UserRepo';
import { RoleCode } from '@src/models/Role';
 
 const RANDOM_NAME = 'test';
 describe('Login basic route', () => {
     setUpDb();
     it('Test updates for various models work', async () => {
        const updatedSupplierRequest = await AdminRepo.updateByEmail(mockUser_1.email, {status: RequestStatus.REJECTED});
        expect(updatedSupplierRequest?.status).toBe(RequestStatus.REJECTED);
        expect(updatedSupplierRequest?.email).toBe(mockUser_1.email);
        const updatedUser = await UserRepo.updateByEmail(mockUser_1.email, {name: RANDOM_NAME});
        expect(updatedUser?.name).toBe(RANDOM_NAME);
        const newUser = await UserRepo.create(injectedUser, RoleCode.ADMIN);
        expect(newUser.roles.length).toBe(1);
     });
 });
 
 