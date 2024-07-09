import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
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
  private readonly logger = new Logger(CountriesController.name);

  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Get countries data' })
  @ApiOkResponse({ description: 'Countries fetched successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get()
  async findAll(): Promise<Country[]> {
    try {
      return await this.countriesService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch all countries');
    }
  }

  @ApiOperation({ summary: 'Get country data by id' })
  @ApiOkResponse({ description: 'Country fetched successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Country> {
    try {
      return await this.countriesService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch country');
    }
  }

  @ApiOperation({ summary: 'Update country data by id' })
  @ApiOkResponse({ description: 'Country updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    try {
      return await this.countriesService.update(id, updateCountryDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update country');
    }
  }
}
