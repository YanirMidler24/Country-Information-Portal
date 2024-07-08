import React, { useCallback, useEffect, useMemo, useState } from "react";
import useCountries from "../../hooks/useCountries";
import { COUNTRIES_TABLE_TITLE } from "../../common/constants";
import CountriesTable from "../../components/CountriesTable/CountryTable";
import Spinner from "../../components/Spinner/Spinner";
import "./Countries.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICountry } from "../../common/interface/interface";

const ITEMS_PER_PAGE = 10; // Number of items per page
const PAGE_NUMBERS_TO_DISPLAY = 10; // Number of page numbers to display at a time

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

  const renderPageNumbers = useCallback(() => {
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(PAGE_NUMBERS_TO_DISPLAY / 2),
        totalPages - PAGE_NUMBERS_TO_DISPLAY + 1
      )
    );
    const endPage = Math.min(
      totalPages,
      startPage + PAGE_NUMBERS_TO_DISPLAY - 1
    );

    const pageNumbers = [];
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  }, [currentPage, totalPages, handlePageChange]);

  const paginatedCountries = useMemo(
    () => getPaginatedCountries(currentPage),
    [getPaginatedCountries, currentPage]
  );

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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Countries;
