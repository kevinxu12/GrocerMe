/**
 * @file Test Db
 * TO DO: Maybe, drop all collections and seeding
 */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import {
  mockAdminRole,
  mockSupplierRole,
  mockSupplierRequest_1,
  mockUser_1,
  mockItemRequest_1,
} from '@src/repository/mocks/data';
import { UserModel } from '@src/models/User';
import { SupplierRequestModel } from '@src/models/SupplierRequest';
import { RoleModel } from '@src/models/Role';
import { ItemRequestModel } from '@src/models/ItemRequest';

/**
 * Seeds the database (aka. initializes the in-memory database with test data);
 *
 */
export async function seedDatabase() {
  await RoleModel.insertMany([mockAdminRole, mockSupplierRole]);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockUsers = [mockUser_1];
  await UserModel.insertMany(mockUsers);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mockSupplierRequests = [mockSupplierRequest_1];
  await SupplierRequestModel.insertMany(mockSupplierRequests);
  const mockItemRequests = [mockItemRequest_1];
  await ItemRequestModel.insertMany(mockItemRequests);
}

/**
 * Connects to the in-memory database
 *
 * @param {MongoMemoryServer} mongoServer Local Mongodb server
 */
export const connectDb = async (mongoServer: MongoMemoryServer) => {
  const uri = await mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Disconnects from a local mongodb server
 *
 * @param {MongoMemoryServer} mongoServer Mongoserver to disconnect from
 */
export const disconnectDb = async (mongoServer: MongoMemoryServer) => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

/**
 * Clears all data from collections
 */
export const removeAllFromCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
};

/**
 * Create an instance of the Mongo Memory Server
 *
 * @returns {any} MongoMemory Server
 */
export const createServer = async () => {
  return await MongoMemoryServer.create();
};

/**
 * Db set up for integration tests
 * Still need to think about whether every route file should integration test everything... Is this boot up and down expensive?
 *
 * @param {boolean} withSeed with database seeding or not
 */
export const setUpDb = (withSeed = true) => {
  let mongoServer: MongoMemoryServer;
  beforeAll(async () => {
    mongoServer = await createServer();
    await connectDb(mongoServer);
  });
  afterAll(async () => {
    await disconnectDb(mongoServer);
  });

  beforeEach(async () => {
    if (withSeed) {
      await seedDatabase();
    }
  });

  // Seed Data
  afterEach(async () => {
    await removeAllFromCollections();
  });
};
