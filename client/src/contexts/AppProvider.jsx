import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import useBooks from '../hooks/useBooks';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const { books, loading, error, resultTitle } = useBooks(searchTerm);

    return (
        <AppContext.Provider value={{
            loading,
            books,
            setSearchTerm,
            resultTitle,
            error
        }}>
            {children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
