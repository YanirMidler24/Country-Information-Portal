import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);

  constructor(
    @InjectModel(Country.name, 'countries')
    private countryModel: Model<CountryDocument>,
  ) {}

  async findAll(): Promise<Country[]> {
    this.logger.log('Fetching all countries');
    try {
      const countries = await this.countryModel
        .find()
        .collation({ locale: 'en', strength: 1 })
        .sort({ countryName: 1 })
        .exec();
      this.logger.log('Successfully fetched all countries');
      return countries;
    } catch (error) {
      this.logger.error('Failed to fetch all countries', { error });
      throw new InternalServerErrorException('Failed to fetch all countries');
    }
  }

  async findOne(id: string): Promise<Country> {
    this.logger.log(`Fetching country with id: ${id}`);
    try {
      const country = await this.countryModel.findById(id).exec();
      if (!country) {
        this.logger.warn(`Country with id ${id} not found`);
        throw new NotFoundException(`Country with id ${id} not found`);
      }
      this.logger.log(`Successfully fetched country with id: ${id}`);
      return country;
    } catch (error) {
      this.logger.error(`Failed to fetch country with id: ${id}`, { error });
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch country');
    }
  }

  async update(
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    this.logger.log(`Updating country with id: ${id}`);
    try {
      const updatedCountry = await this.countryModel
        .findByIdAndUpdate(id, updateCountryDto, { new: true })
        .exec();
      if (!updatedCountry) {
        this.logger.warn(`Country with id ${id} not found`);
        throw new NotFoundException(`Country with id ${id} not found`);
      }
      this.logger.log(`Successfully updated country with id: ${id}`);
      return updatedCountry;
    } catch (error) {
      this.logger.error(`Failed to update country with id: ${id}`, { error });
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update country');
    }
  }
}
