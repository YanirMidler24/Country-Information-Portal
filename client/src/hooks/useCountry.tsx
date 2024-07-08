import { useEffect, useState } from "react";
import { getCountryById } from "../api/countries/country.api";
import { ICountry } from "../common/interface/interface";

const useCountry = (id: string) => {
  const [country, setCountry] = useState<ICountry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      setIsLoading(true);
      try {
        const country = await getCountryById(id);
        setCountry(country);
      } catch (error) {
        setError("Failed to fetch countries");
        console.error("Failed to fetch countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [id]);

  return { country, isLoading, error };
};

export default useCountry;
