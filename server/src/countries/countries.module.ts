import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { Country, CountrySchema } from './schemas/country.schema';
import { DbModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    MongooseModule.forFeature(
      [{ name: Country.name, schema: CountrySchema }],
      'countries',
    ),
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
