// import React, { useState } from "react";
// import { useGlobalContext } from "../contexts/AppProvider";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"; // Import sorting icons
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import SearchForm from "../components/common/SearchForm";

// const BookTable = () => {
//   const { books, resultTitle } = useGlobalContext();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(10);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

//   // Apply sorting to the books array
//   const sortedBooks = [...books].sort((a, b) => {
//     if (sortConfig.direction === "asc") {
//       return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
//     }
//     if (sortConfig.direction === "desc") {
//       return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
//     }
//     return 0;
//   });

//   // Calculate index of the first and last record to display on the current page
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = sortedBooks.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );

//   // Calculate total number of pages
//   const totalPages = Math.ceil(sortedBooks.length / recordsPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Change records per page
//   const changeRecordsPerPage = (e) => {
//     const selectedRecordsPerPage = Number(e.target.value);
//     setRecordsPerPage(selectedRecordsPerPage);
//     setCurrentPage(1); // Reset to the first page when records per page changes
//   };

//   // Handle column sorting
//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   // Generate pagination numbers
//   const renderPaginationNumbers = () => {
//     const maxPages = 2;
//     const pages = [];

//     if (totalPages <= maxPages + 2) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       for (let i = 1; i <= maxPages; i++) {
//         pages.push(i);
//       }
//       pages.push("...");
//       pages.push(totalPages - 1);
//       pages.push(totalPages);
//     }

//     return pages.map((page, index) => (
//       <button
//         key={index}
//         onClick={() => paginate(page)}
//         className={`relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 focus-visible:outline-none focus-visible:ring ring-gray-300 focus-visible:ring-opacity-50 ${
//           page === currentPage ? "bg-gray-200" : ""
//         }`}
//       >
//         {page === "..." ? page : page}
//       </button>
//     ));
//   };

//   // Function to convert records to CSV format
//   const convertToCSV = (data) => {
//     const csvRows = [];
//     const headers = Object.keys(data[0]).filter((header) => header !== "id"); // Exclude 'id' column
//     csvRows.push(headers.join(","));

//     data.forEach((record) => {
//       const values = headers.map((header) => {
//         const escaped = ("" + record[header]).replace(/"/g, '\\"');
//         return `"${escaped}"`;
//       });
//       csvRows.push(values.join(","));
//     });

//     return csvRows.join("\n");
//   };

//   // Function to trigger download
//   const downloadCSV = () => {
//     // Get the current records based on the pagination
//     const currentRecords = sortedBooks.slice(
//       indexOfFirstRecord,
//       indexOfLastRecord
//     );

//     // Convert current records to CSV format
//     const csv = convertToCSV(currentRecords);

//     // Create a downloadable link
//     const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "books.csv");
//     document.body.appendChild(link);

//     // Trigger download
//     link.click();

//     // Alert message after successful download
//     alert("books.csv downloaded successfully!");
//   };

//   return (
//     <div className="overflow-x-auto">
//       {/* table features */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h2 className="font-semibold text-center mb-2 sm:mb-0">
//           Click on column headers to sort
//         </h2>

//         <div className="flex justify-center flex-grow sm:justify-start">
//           <SearchForm />
//         </div>

//         <div className="flex sm:flex-row items-center justify-center">
//           <button
//             onClick={downloadCSV}
//             className="px-3 py-1 mr-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 mb-2 sm:mb-0 sm:mr-4"
//           >
//             Download CSV
//           </button>
//           <select
//             className="px-3 py-[0.4rem] mt-[-6px] sm:mt-0 sm:py-2 border rounded-md"
//             value={recordsPerPage}
//             onChange={changeRecordsPerPage}
//           >
//             <option value={10}>10 records per page</option>
//             <option value={20}>20 records per page</option>
//             <option value={50}>50 records per page</option>
//             <option value={100}>100 records per page</option>
//           </select>
//         </div>
//       </div>

//       {/* table */}
//       <div className="p-4 bg-white rounded-2xl overflow-x-auto">
//         <table className="table-fixed p-4 w-full bg-white min-w-max">
//           <thead>
//             <tr className="border-b-2 border-black">
//               <th
//                 className="px-4 py-4 w-1/7 sm:w-auto text-center"
//                 onClick={() => requestSort("ratings_average")}
//               >
//                 Ratings
//                 {sortConfig.key === "ratings_average" && (
//                   <span className="ml-1">
//                     {sortConfig.direction === "asc" ? (
//                       <ChevronUpIcon className="h-4 w-4 text-gray-500 inline" />
//                     ) : (
//                       <ChevronDownIcon className="h-4 w-4 text-gray-500 inline" />
//                     )}
//                   </span>
//                 )}
//               </th>
//               <th
//                 className="px-4 py-2 w-1/7 sm:w-auto text-center"
//                 onClick={() => requestSort("author_name")}
//               >
//                 Author Name
//                 {/* Add sorting icons similarly */}
//               </th>
//               <th
//                 className="px-4 py-2 w-1/7 sm:w-auto text-center"
//                 onClick={() => requestSort("title")}
//               >
//                 Title
//                 {/* Add sorting icons similarly */}
//               </th>
//               <th
//                 className="px-4 py-2 w-1/7 sm:w-auto text-center"
//                 onClick={() => requestSort("first_publish_year")}
//               >
//                 Year
//                 {/* Add sorting icons similarly */}
//               </th>
//               <th
//                 className="px-4 py-2 w-1/7 sm:w-auto text-center"
//                 onClick={() => requestSort("subject")}
//               >
//                 Subject
//                 {/* Add sorting icons similarly */}
//               </th>
//               <th
//                 className="px-4 py-2 w-1/7 sm:w-auto text-center"
//                 onClick={() => requestSort("birth_date")}
//               >
//                 Author Birth Date
//                 {/* Add sorting icons similarly */}
//               </th>
//               <th
//                 className="px-4 py-2 w-1/7 sm:w-auto text-center"
//                 onClick={() => requestSort("top_work")}
//               >
//                 Top Work
//                 {/* Add sorting icons similarly */}
//               </th>
//               {/* Add sorting icons to other headers similarly */}
//             </tr>
//           </thead>
//           <tbody>
//             {currentRecords.map((book, index) => (
//               <tr
//                 key={book.id}
//                 className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
//               >
//                 <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center rounded-l-2xl">
//                   {typeof book.ratings_average === "number"
//                     ? parseFloat(book.ratings_average).toFixed(1)
//                     : "N/A"}
//                 </td>
//                 <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
//                   {book.author_name}
//                 </td>
//                 <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
//                   {book.title}
//                 </td>
//                 <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
//                   {book.first_publish_year}
//                 </td>
//                 <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
//                   {book.subject}
//                 </td>
//                 <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center">
//                   {book.birth_date}
//                 </td>
//                 <td className="px-4 py-6 w-1/7 sm:w-auto truncate text-center rounded-r-2xl">
//                   {book.top_work}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {resultTitle === "No Search Result Found!" && (
//           <div className="text-red-500 text-center my-4">
//             No search data found related to your search.
//           </div>
//         )}
//       </div>

//       {/* Pagination controls */}
//       <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-2xl mt-6">
//         <div className="mb-2 sm:mb-0">
//           <p className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">{indexOfFirstRecord + 1}</span> to{" "}
//             <span className="font-medium">
//               {Math.min(indexOfLastRecord, sortedBooks.length)}
//             </span>{" "}
//             of <span className="font-medium">{sortedBooks.length}</span> results
//           </p>
//         </div>
//         <div>
//           <nav
//             className="inline-flex -space-x-px rounded-md shadow-sm"
//             aria-label="Pagination"
//           >
//             <button
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`relative inline-flex items-center px-2 py-2 text-gray-400 bg-white hover:text-gray-500 focus:z-20 focus:outline-offset-0 focus-visible:outline-none focus-visible:ring ring-gray-300 focus-visible:ring-opacity-50 ${
//                 currentPage === 1 ? "cursor-not-allowed" : ""
//               }`}
//             >
//               <span className="sr-only">Previous</span>
//               <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//             {renderPaginationNumbers()}
//             <button
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`relative inline-flex items-center px-2 py-2 text-gray-400 bg-white hover:text-gray-500 focus:z-20 focus:outline-offset-0 focus-visible:outline-none focus-visible:ring ring-gray-300 focus-visible:ring-opacity-50 ${
//                 currentPage === totalPages ? "cursor-not-allowed" : ""
//               }`}
//             >
//               <span className="sr-only">Next</span>
//               <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookTable;

import React, { useState } from "react";
import { useGlobalContext } from "../contexts/AppProvider";
import TableFeatures from "../components/Books/TableFeatures";
import Table from "../components/Books/Table";
import PaginationControls from "../components/Books/PaginationControls";
import Loading from "../components/common/Loading";

const BookTable = () => {
  const { books, resultTitle, loading } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Apply sorting to the books array
  const sortedBooks = [...books].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    if (sortConfig.direction === "desc") {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });

  // Calculate index of the first and last record to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedBooks.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedBooks.length / recordsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change records per page
  const changeRecordsPerPage = (e) => {
    const selectedRecordsPerPage = Number(e.target.value);
    setRecordsPerPage(selectedRecordsPerPage);
    setCurrentPage(1); // Reset to the first page when records per page changes
  };

  // Handle column sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Function to trigger download
  const downloadCSV = () => {
    // Get the current records based on the pagination
    const currentRecords = sortedBooks.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    // Convert current records to CSV format
    const csv = convertToCSV(currentRecords);

    // Create a downloadable link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "books.csv");
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Alert message after successful download
    alert("books.csv downloaded successfully!");
  };

  // Function to convert records to CSV format
  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]).filter((header) => header !== "id"); // Exclude 'id' column
    csvRows.push(headers.join(","));

    data.forEach((record) => {
      const values = headers.map((header) => {
        const escaped = ("" + record[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto p-4 sm:p-10 bg-gray-100">
      <TableFeatures
        downloadCSV={downloadCSV}
        recordsPerPage={recordsPerPage}
        changeRecordsPerPage={changeRecordsPerPage}
      />
      <Table
        currentRecords={currentRecords}
        resultTitle={resultTitle}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />
     <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        indexOfFirstRecord={indexOfFirstRecord} // Pass indexOfFirstRecord as a prop
        indexOfLastRecord={indexOfLastRecord} 
        sortedBooks={sortedBooks}
      />
    </div>
  );
};

export default BookTable;
