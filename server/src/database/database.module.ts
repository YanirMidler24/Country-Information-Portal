import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}?appName=yanir-cluster-24`,
      {
        connectionName: 'countries',
      },
    ),
  ],
})
export class DbModule {}
