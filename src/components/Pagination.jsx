const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
    return (
      <div className="text-center">
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