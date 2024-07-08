import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './schemas/country.schema';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Country')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'get countries data' })
  @ApiOkResponse({ description: 'countries was get successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  async findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @ApiOperation({ summary: 'get country data by id' })
  @ApiOkResponse({ description: 'country was get successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Country> {
    return this.countriesService.findOne(id);
  }

  @ApiOperation({ summary: 'update country data by id' })
  @ApiOkResponse({ description: 'country was updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    return this.countriesService.update(id, updateCountryDto);
  }
}
