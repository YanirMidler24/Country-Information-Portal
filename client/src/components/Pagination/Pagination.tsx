import React from "react";
import "./Pagination.css";
import Button from "../Button/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  pageNumbers: React.ReactNode;
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
  const { currentPage, totalPages, handlePageChange, pageNumbers } = props;
  return (
    <div className="pagination">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      {pageNumbers}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
