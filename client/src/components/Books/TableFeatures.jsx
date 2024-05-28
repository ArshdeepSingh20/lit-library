import React from "react";
import SearchForm from "../common/SearchForm";

const TableFeatures = ({ downloadCSV, recordsPerPage, changeRecordsPerPage }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <h2 className="font-semibold text-center mb-2 sm:mb-0">
        Click on column headers to sort
      </h2>

      <div className="flex justify-center mb-4 sm:mb-0 flex-grow sm:justify-start">
        <SearchForm />
      </div>

      <div className="flex sm:flex-row items-center justify-center">
        {/* Download Button */}
        <button
          onClick={downloadCSV}
          className="px-4 py-1 mr-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 mb-2 sm:mb-0 sm:mr-4"
        >
          Download CSV
        </button>
        {/* Records Per Page Selector */}
        <select
          className="px-3 py-[0.4rem] mt-[-6px] sm:mt-0 sm:py-2 border rounded-md"
          value={recordsPerPage}
          onChange={changeRecordsPerPage}
        >
          <option value={10}>10 records per page</option>
          <option value={20}>20 records per page</option>
          <option value={50}>50 records per page</option>
          <option value={100}>100 records per page</option>
        </select>
      </div>
    </div>
  );
};

export default TableFeatures;
