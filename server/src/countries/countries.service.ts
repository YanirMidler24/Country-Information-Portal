import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name, 'countries')
    private countryModel: Model<CountryDocument>,
  ) {}

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().sort({ countryName: 1 }).exec();
  }

  async findOne(id: string): Promise<Country> {
    return this.countryModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    return this.countryModel
      .findByIdAndUpdate(id, updateCountryDto, { new: true })
      .exec();
  }
}
