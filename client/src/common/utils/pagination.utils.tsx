interface RenderPageNumbersProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  pageNumbersToDisplay: number;
}

export const renderPageNumbers = (props: RenderPageNumbersProps) => {
  const { currentPage, totalPages, handlePageChange, pageNumbersToDisplay } =
    props;
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(pageNumbersToDisplay / 2),
      totalPages - pageNumbersToDisplay + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + pageNumbersToDisplay - 1);

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
};
