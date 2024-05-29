import { MongooseModuleOptions } from '@nestjs/mongoose';

export const databaseConfig: MongooseModuleOptions = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/shopify',

  maxPoolSize: parseInt(process.env.POOL_SIZE!) || 5, 
};
