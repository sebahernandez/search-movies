const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
    return (
      <div>
        <button onClick={onPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={onNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  }

  export default Pagination;