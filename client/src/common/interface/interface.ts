export interface ICountry {
  _id: string;
  countryName: string;
  capital: string;
  region: string;
  subRegion: string;
  population: number;
  timezone: string;
  continent: string;
  flagUrl: string;
}

export interface IEditableFields {
  capital: string;
  population: number;
}

export interface IValidationResult {
  isValid: boolean;
  error: string | null;
}
