import React, { useState, useEffect, useCallback } from "react";
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
  const [editableFields, setEditableFields] = useState<Partial<ICountry>>({
    capital: "",
    population: 0,
  });

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

  const handleValidation = useCallback(
    (name: string, value: string | number) => {
      const { error, valid } = validateInput(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
      setIsValid(valid);
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const formattedValue = value;
      setEditableFields((prevFields) => ({
        ...prevFields,
        [name]: formattedValue,
      }));
      handleValidation(name, formattedValue);
    },
    [handleValidation]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div>
      <CountryTable
        title={COUNTRY_TABLE_TITLE}
        country={country}
        editableFields={editableFields}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        errors={errors}
        isValid={isValid}
      />
      <Link to={`/?page=${page}`}>Back</Link>
    </div>
  );
};

export default Country;
