import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const PaginationControls = ({ currentPage, totalPages, paginate, indexOfFirstRecord, indexOfLastRecord, sortedBooks }) => {
  // Function to generate pagination numbers
 // Generate pagination numbers
 const renderPaginationNumbers = () => {
    const maxPages = 2;
    const pages = [];

    if (totalPages <= maxPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => paginate(page)}
        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 focus-visible:outline-none focus-visible:ring ring-gray-300 focus-visible:ring-opacity-50 ${
          page === currentPage ? "bg-gray-200" : ""
        }`}
      >
        {page === "..." ? page : page}
      </button>
    ));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-2xl mt-6">
        <div className="mb-2 sm:mb-0">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{indexOfFirstRecord + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastRecord, sortedBooks.length)}
            </span>{" "}
            of <span className="font-medium">{sortedBooks.length}</span> results
          </p>
        </div>
        <div>
          <nav
            className="inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 bg-white hover:text-gray-500 focus:z-20 focus:outline-offset-0 focus-visible:outline-none focus-visible:ring ring-gray-300 focus-visible:ring-opacity-50 ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {renderPaginationNumbers()}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 text-gray-400 bg-white hover:text-gray-500 focus:z-20 focus:outline-offset-0 focus-visible:outline-none focus-visible:ring ring-gray-300 focus-visible:ring-opacity-50 ${
                currentPage === totalPages ? "cursor-not-allowed" : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
  );
};

export default PaginationControls;
