import { MongooseModuleOptions } from '@nestjs/mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/shopify';
const maxPoolSize = parseInt(process.env.POOL_SIZE || '5', 10);

if (isNaN(maxPoolSize)) {
  throw new Error('Invalid POOL_SIZE environment variable');
}

export const databaseConfig: MongooseModuleOptions = {
  uri,
  maxPoolSize,
};
