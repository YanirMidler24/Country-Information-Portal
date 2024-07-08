import React from "react";
import { ICountry } from "../../common/interface/interface";
import "./CountriesTable.css";
import Button from "../Button/Button";

interface CountriesTableProps {
  countries: ICountry[];
  title: string;
  handleDetailsClick: (value: ICountry) => void;
}

const CountriesTable: React.FC<CountriesTableProps> = (
  props: CountriesTableProps
) => {
  const { title, countries, handleDetailsClick } = props;

  const TH_HEADERS = (
    <tr>
      <th>Name</th>
      <th>Capital</th>
      <th>Region</th>
      <th>Sub-region</th>
      <th>Population</th>
      <th>Details</th>
    </tr>
  );

  return (
    <div className="table-container">
      <h1>{title}</h1>
      <table className="countries-table">
        <thead>{TH_HEADERS}</thead>
        <tbody>
          {countries.map((country: ICountry) => (
            <tr key={country._id}>
              <td>{country.countryName}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>{country.subRegion}</td>
              <td>{country.population}</td>
              <td>
                <Button onClick={() => handleDetailsClick(country)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountriesTable;
