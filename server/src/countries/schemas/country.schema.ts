import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema()
export class Country {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String, default: 'N/A' })
  countryName: string;

  @Prop({ required: true, type: String, default: 'N/A' })
  capital: string;

  @Prop({ required: true, type: String, default: 'N/A' })
  region: string;

  @Prop({ required: true, type: String, default: 'N/A' })
  subRegion: string;

  @Prop({ required: true, type: Number, default: 0 })
  population: number;

  @Prop({ required: true, type: String, default: 'N/A' })
  timezone: string;

  @Prop({ required: true, type: String, default: 'N/A' })
  continent: string;

  @Prop({ required: true, type: String, default: 'N/A' })
  flagUrl: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
