import { PartialType } from '@nestjs/mapped-types';
import { CountryDto } from './country.dto';

export class UpdateCountryDto extends PartialType(CountryDto) {}
