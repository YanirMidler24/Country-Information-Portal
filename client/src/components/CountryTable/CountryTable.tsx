import React from "react";
import { ICountry } from "../../common/interface/interface";
import "./CountryTable.css";
import Button from "../Button/Button";

interface CountryTableProps {
  country: ICountry;
  title: string;
  editableFields: Partial<ICountry>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  errors: { capital: string; population: string };
  isValid: boolean;
}

const CountryTable: React.FC<CountryTableProps> = (
  props: CountryTableProps
) => {
  const {
    title,
    country,
    editableFields,
    handleInputChange,
    handleSave,
    errors,
    isValid,
  } = props;

  const TH_HEADERS = (
    <tr>
      <th>Name</th>
      <th>Capital</th>
      <th>Region</th>
      <th>Sub-region</th>
      <th>Population</th>
      <th>Flag</th>
      <th>Actions</th>
    </tr>
  );

  return (
    <div className="table-container">
      <h1>{title}</h1>
      <table className="country-table">
        <thead>{TH_HEADERS}</thead>
        <tbody>
          <tr key={country._id}>
            <td>{country.countryName}</td>
            <td>
              <input
                type="text"
                name="capital"
                value={editableFields.capital ?? ""}
                onChange={handleInputChange}
              />
              {errors.capital && (
                <div className="onChangeError">{errors.capital}</div>
              )}
            </td>
            <td>{country.region}</td>
            <td>{country.subRegion}</td>
            <td>
              <input
                type="text"
                name="population"
                value={editableFields.population ?? ""}
                onChange={handleInputChange}
              />
              {errors.population && (
                <div className="onChangeError">{errors.population}</div>
              )}
            </td>
            <td>
              <img src={country.flagUrl} alt={`${country.countryName} flag`} />
            </td>
            <td>
              <Button onClick={handleSave} disabled={!isValid}>
                Save
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CountryTable;
