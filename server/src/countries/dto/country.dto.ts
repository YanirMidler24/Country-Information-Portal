import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CountryDto {
  @ApiProperty({
    type: String,
    description: 'Country name',
    example: 'France',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Capital of the country',
    example: 'Paris',
    required: true,
  })
  @IsString()
  capital: string;

  @ApiProperty({
    type: String,
    description: 'Region of the country',
    example: 'Europe',
    required: true,
  })
  @IsString()
  region: string;

  @ApiProperty({
    type: String,
    description: 'Sub-region of the country',
    example: 'Western Europe',
    required: true,
  })
  @IsString()
  subRegion: string;

  @ApiProperty({
    type: Number,
    description: 'Population of the country',
    example: 67081000,
    required: true,
  })
  @IsNumber()
  population: number;

  @ApiProperty({
    type: String,
    description: 'Timezone of the country',
    example: 'UTC+1',
    required: true,
  })
  @IsString()
  timezone: string;

  @ApiProperty({
    type: String,
    description: 'Continent of the country',
    example: 'Europe',
    required: true,
  })
  @IsString()
  continent: string;

  @ApiProperty({
    type: String,
    description: 'URL of the country flag',
    example: 'https://restcountries.com/v3.1/all/flag/france.png',
    required: true,
  })
  @IsString()
  flagUrl: string;
}
