// Import the Pagination component from react-bootstrap
import { Pagination } from "react-bootstrap";

// Define a functional component named Paginate that takes currentPage, paginate, and totalPages as props
const Paginate = ({ currentPage, paginate, totalPages }) => {
  // Create an empty array to store page numbers
  const pageNumbers = [];

  // Generate an array of page numbers from 1 to totalPages
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Render the Pagination component with page navigation buttons
  return (
    <Pagination className="float-md-end d-flex justify-content-center pt-2">
      {/* First Page button */}
      <Pagination.First
        // Add the "disabled" class if the current page is the first page
        className={currentPage === 1 ? "disabled" : ""}
        // Call the paginate function with page number 1 when clicked
        onClick={() => paginate(1)}
      />

      {/* Previous Page button */}
      <Pagination.Prev
        // Add the "disabled" class if the current page is the first page
        className={currentPage === 1 ? "disabled" : ""}
        // Call the paginate function with the previous page number when clicked
        onClick={() => paginate(currentPage - 1)}
      />

      {/* Render individual page number buttons */}
      {pageNumbers.map((number) => (
        <Pagination.Item
          // Add the "active" class to the current page number button
          className={number === currentPage ? "active" : ""}
          // Call the paginate function with the respective page number when clicked
          onClick={() => paginate(number)}
          key={number}
        >
          {number}
        </Pagination.Item>
      ))}

      {/* Next Page button */}
      <Pagination.Next
        // Add the "disabled" class if the current page is the last page
        className={currentPage === totalPages ? "disabled" : ""}
        // Call the paginate function with the next page number when clicked
        onClick={() => paginate(currentPage + 1)}
      />

      {/* Last Page button */}
      <Pagination.Last
        // Add the "disabled" class if the current page is the last page
        className={currentPage === totalPages ? "disabled" : ""}
        // Call the paginate function with the last page number when clicked
        onClick={() => paginate(totalPages)}
      />
    </Pagination>
  );
};

// Export the Paginate component as the default export
export default Paginate;
