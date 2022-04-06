/**
 * @file Integration Test for Repository methods
 * Tests that some of the methods work in the in-memory test DB
 * @author Kevin Xu
 */
 jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

 import { setUpDb } from '@src/database/test/testDb';
import AdminRepo from '../AdminRepo';
import { injectedUser, mockUser_1, TEST_AMOUNT, TEST_DESCRIPTION, TEST_LOCATION_OBJECT, TEST_TITLE } from '../mocks/data';
import { RequestStatus } from '@src/helpers/model';
import UserRepo from '../UserRepo';
import { RoleCode } from '@src/models/Role';
import ItemRepo from '../ItemRepo';
 
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
        const newItemRequest = await ItemRepo.createNewItemRequest({user: newUser, amount: TEST_AMOUNT, description: TEST_DESCRIPTION, title: TEST_TITLE, location: TEST_LOCATION_OBJECT});
        expect(newItemRequest?.requester).toStrictEqual(newUser?._id);
        const itemSearchResults = await ItemRepo.search({query: TEST_DESCRIPTION, pageSize: 20, page: 1});
        expect(itemSearchResults?.length).toStrictEqual(1); // this should be 1, because we default to only searching for accepted
     });
 });
 
 