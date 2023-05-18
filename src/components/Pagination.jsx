const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {

  const styles = {
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '20px',
      margin: '10px',
      cursor: 'pointer',
    },
  };
    return (
      <div className="text-center">
        <button 
          onClick={onPrevPage} 
          disabled={currentPage === 1}
          style={styles.button}
          >
          Prev
        </button>
        <button 
          onClick={onNextPage} 
          disabled={currentPage === totalPages}
          style={styles.button}
          >
          Next
        </button>
      </div>
    );
  }

  export default Pagination;