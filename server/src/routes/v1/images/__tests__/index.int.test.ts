/**
 * TO DO - The testing for the entire project should be more robust
 */
 jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

 import app from '@src/app';
 import supertest from 'supertest';
 import { setUpDb } from '@src/database/test/testDb';
 import fs from 'fs';
 import path from 'path';

 describe('Items basic route', () => {
    const request = supertest(app);
    setUpDb();
    it('Test upload file', async () => {

        const imageName = 'Test.png';
        const base64Image = fs.readFileSync(path.resolve(__dirname, imageName), {encoding:'base64'});
        const endpoint = '/api/images';
        const response = await request.post(endpoint).send({name: imageName, image: base64Image});
        expect(response.status).toBe(200);
    });
});