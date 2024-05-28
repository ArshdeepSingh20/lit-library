import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const Table = ({ currentRecords, resultTitle, sortConfig, requestSort }) => {
  return (
    <div className="p-4 bg-white rounded-2xl overflow-x-auto">
      <table className="table-fixed p-4 w-full bg-white min-w-max">
        <thead>
          <tr className="border-b-2 border-black">
            <th
              className="px-4 py-4 w-1/7 sm:w-auto text-center"
              onClick={() => requestSort("ratings_average")}
            >
              Ratings
              {sortConfig.key === "ratings_average" && (
                <span className="ml-1">
                  {sortConfig.direction === "asc" ? (
                    <ChevronUpIcon className="h-4 w-4 text-gray-500 inline" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500 inline" />
                  )}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 w-1/7 sm:w-auto text-center"
              onClick={() => requestSort("author_name")}
            >
              Author Name
              {/* Add sorting icons similarly */}
            </th>
            <th
              className="px-4 py-2 w-1/7 sm:w-auto text-center"
              onClick={() => requestSort("title")}
            >
              Title
              {/* Add sorting icons similarly */}
            </th>
            <th
              className="px-4 py-2 w-1/7 sm:w-auto text-center"
              onClick={() => requestSort("first_publish_year")}
            >
              Year
              {/* Add sorting icons similarly */}
            </th>
            <th
              className="px-4 py-2 w-1/7 sm:w-auto text-center"
              onClick={() => requestSort("subject")}
            >
              Subject
              {/* Add sorting icons similarly */}
            </th>
            <th
              className="px-4 py-2 w-1/7 sm:w-auto text-center"
              onClick={() => requestSort("birth_date")}
            >
              Author Birth Date
              {/* Add sorting icons similarly */}
            </th>
            <th
              className="px-4 py-2 w-1/7 sm:w-auto text-center"
              onClick={() => requestSort("top_work")}
            >
              Top Work
              {/* Add sorting icons similarly */}
            </th>
            {/* Add sorting icons to other headers similarly */}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((book, index) => (
            <tr
              key={book.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center rounded-l-2xl">
                {typeof book.ratings_average === "number"
                  ? parseFloat(book.ratings_average).toFixed(1)
                  : "N/A"}
              </td>
              <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
                {book.author_name}
              </td>
              <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
                {book.title}
              </td>
              <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
                {book.first_publish_year}
              </td>
              <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
                {book.subject}
              </td>
              <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
                {book.birth_date}
              </td>
              <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center rounded-r-2xl">
                {book.top_work}
              </td>
              {/* Add similar classNames for other table data cells */}
            </tr>
          ))}
        </tbody>
      </table>
      {resultTitle === "No Search Result Found!" && (
        <div className="text-red-500 text-center my-4">
          No search data found related to your search.
        </div>
      )}
    </div>
  );
};

export default Table;
