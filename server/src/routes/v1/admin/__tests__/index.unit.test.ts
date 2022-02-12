// the mock for this class should be below all other mock imports
/**
 * @file Unit tests for the admin route
 * @author Kevin Xu
 */

import { mockSupplierRequest_2, mockUser_1, mockUser_2 } from '@src/repository/mocks/data';
import { mockFindSupplierRequestByEmail} from '@src/repository/mocks/AdminRepoMock';
import { newSupplierRequest } from '@src/routes/v1/admin/logic';
import { ForbiddenError } from '@src/core/ApiError';
describe('Supplier Requests', () => {

    it('Should send forbidden error because supplierrequest for mockUSer_1 already exists', async () => {
        await expect(newSupplierRequest(mockUser_1)).rejects.toThrow(new ForbiddenError('Supplier Request already exists'));
        expect(mockFindSupplierRequestByEmail).toBeCalledTimes(1);
    });

    it('Should send forbidden error because user is logged out but request attempt is made', async() => {
        await expect(newSupplierRequest(null)).rejects.toThrow(new ForbiddenError('User login expired'));
    });

    it('Should successfully create new SupplierRequest', async() => {
        const user_2_request = await newSupplierRequest(mockUser_2);
        expect(user_2_request).toBe(mockSupplierRequest_2);
    });

});