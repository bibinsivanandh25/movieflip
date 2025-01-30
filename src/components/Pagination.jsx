const Pagination = ({ currentPage, totalPage, onPrevPage, onNextPage }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        <img src="/arrowLeft.svg" alt="arrow left icon" />
      </button>
      <p>
        <span>{currentPage}</span>/ {totalPage}
      </p>
      <button onClick={onNextPage} disabled={currentPage === totalPage}>
        <img src="/arrow-right-tiny.svg" alt="arrow right icon" />
      </button>
    </div>
  );
};

export default Pagination;
