import React, { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/AppProvider";

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const inputRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => inputRef.current.focus(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = inputRef.current.value.trim();
    if (!searchTerm.replace(/[^\w\s]/gi, "")) {
      setSearchTerm("the lost world");
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm(searchTerm);
    }
    navigate("/books-details");
  };

  return (
    <div className="search-form w-full max-w-56 sm:max-w-xl mx-auto">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem flex items-center justify-between bg-white rounded-lg py-1 px-4">
              <input
                type="text"
                className="form-control flex-grow  mr-2 px-2 focus:outline-none text-sm sm:text-base"
                placeholder="The Lost World ..."
                ref={inputRef}
              />
              <button
                className="flex items-center justify-center text-white rounded-full p-2 text-sm sm:text-base"
                onClick={handleSubmit}
              >
                <FaSearch className="text-gray-500" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
