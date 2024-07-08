import React, { useCallback, useEffect, useMemo, useState } from "react";
import useCountries from "../../hooks/useCountries";
import {
  COUNTRIES_TABLE_TITLE,
  ITEMS_PER_PAGE,
  PAGE_NUMBERS_TO_DISPLAY,
} from "../../common/constants";
import CountriesTable from "../../components/CountriesTable/CountriesTable";
import Spinner from "../../components/Spinner/Spinner";
import "./Countries.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICountry } from "../../common/interface/interface";
import { renderPageNumbers } from "../../common/utils/pagination.utils";
import Pagination from "../../components/Pagination/Pagination";

const Countries: React.FC = () => {
  const { countries, isLoading, error } = useCountries();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  const handleDetailsClick = useCallback(
    (country: ICountry) => {
      navigate(`/country/${country.countryName}`, {
        state: { id: country._id, page: currentPage },
      });
    },
    [navigate, currentPage]
  );

  const getPaginatedCountries = useCallback(
    (page: number) => {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return countries.slice(start, end);
    },
    [countries]
  );

  const totalPages = useMemo(
    () => Math.ceil(countries.length / ITEMS_PER_PAGE),
    [countries.length]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const paginatedCountries = useMemo(
    () => getPaginatedCountries(currentPage),
    [getPaginatedCountries, currentPage]
  );

  const pageNumbers = renderPageNumbers({
    currentPage,
    totalPages,
    handlePageChange,
    pageNumbersToDisplay: PAGE_NUMBERS_TO_DISPLAY,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <CountriesTable
        title={COUNTRIES_TABLE_TITLE}
        countries={paginatedCountries}
        handleDetailsClick={handleDetailsClick}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        pageNumbers={pageNumbers}
      />
    </div>
  );
};

export default Countries;
