import React, { useState, useEffect } from "react";
import { COUNTRY_TABLE_TITLE } from "../../common/constants";
import CountryTable from "../../components/CountryTable/CountryTable";
import Spinner from "../../components/Spinner/Spinner";
import "./Country.css";
import useCountry from "../../hooks/useCountry";
import { Link, useLocation } from "react-router-dom";
import { updateCountry } from "../../api/countries/country.api";
import { ICountry } from "../../common/interface/interface";
import { validateInput } from "../../common/helper/helper";

const Country: React.FC = () => {
  const location = useLocation();
  const id = location.state?.id;
  const page = location.state?.page || 1;
  const { country, isLoading, error } = useCountry(id);

  const [errors, setErrors] = useState({ capital: "", population: "" });
  const [isValid, setIsValid] = useState(true);
  const [editableFields, setEditableFields] = useState<Partial<ICountry>>({});

  useEffect(() => {
    if (country) {
      setEditableFields({
        capital: country.capital,
        population: country.population,
      });
      const valid =
        validateInput("capital", country.capital)?.valid &&
        validateInput("population", country.population)?.valid;
      setIsValid(valid);
    }
  }, [country]);

  const handleSave = async () => {
    try {
      await updateCountry(id, editableFields);
      alert("Country updated successfully!");
    } catch (error) {
      console.error("Failed to update country:", error);
      alert("Failed to update country.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = name === "population" ? Number(value) : value;
    setEditableFields((prevFields) => ({
      ...prevFields,
      [name]: formattedValue,
    }));
    handleValidation(name, formattedValue);
  };

  const handleValidation = (name: string, value: string | number) => {
    const { error, valid } = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setIsValid(valid);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {error && <div className="error">{error}</div>}
      {!isLoading && country && (
        <CountryTable
          title={COUNTRY_TABLE_TITLE}
          country={country}
          editableFields={editableFields}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          errors={errors}
          isValid={isValid}
        />
      )}
      <Link to={`/?page=${page}`}>Back</Link>
    </>
  );
};

export default Country;
