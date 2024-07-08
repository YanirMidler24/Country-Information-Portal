import { useEffect, useState } from "react";
import { getAllCountries } from "../api/countries/country.api";
import { ICountry } from "../common/interface/interface";

const useCountries = () => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const countries = await getAllCountries();
        setCountries(countries);
      } catch (error) {
        setError("לא נמצאו מדינות");
        console.error("Failed to fetch countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, isLoading, error };
};

export default useCountries;
