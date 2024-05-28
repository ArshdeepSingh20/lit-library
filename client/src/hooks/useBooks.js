import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BOOKS_URL = "https://openlibrary.org/search.json?title=";
const AUTHOR_SEARCH_URL = "https://openlibrary.org/search/authors.json?q=";

const fetchBooks = async (searchTerm) => {
    try {
        const headers = {
            "User-Agent": "LitLibrary/1.0 (singharshdeep9039@gmail.com)"
        };

        const response = await axios.get(`${BOOKS_URL}${searchTerm}`, { headers });
        const { docs } = response.data;

        if (docs) {
            const bookPromises = docs.slice(0, 100).map(async (bookSingle) => {
                const {
                    key,
                    ratings_average = "N/A",
                    author_name = ["Unknown Author"],
                    title = "No Title",
                    first_publish_year = "N/A",
                    author_key = [],
                    subject = ["No Subject"],
                } = bookSingle;

                const authorSearchResponse = await axios.get(`${AUTHOR_SEARCH_URL}${author_name.join(" ")}`, { headers });
                const { docs: authorDocs } = authorSearchResponse.data;
                const authorData = authorDocs.length > 0 ? authorDocs[0] : null;

                const topWork = authorData ? authorData.top_work : "N/A";
                const authorKey = author_key.length > 0 ? author_key[0] : null;

                const birthDate = authorKey ? await fetchAuthorBirthDate(authorKey) : "N/A";

                return {
                    id: key,
                    ratings_average,
                    author_name: author_name.join(", "),
                    title,
                    first_publish_year,
                    subject: subject.join(", "),
                    birth_date: birthDate,
                    top_work: topWork
                };
            });

            const newBooks = await Promise.all(bookPromises);

            return { books: newBooks, resultTitle: newBooks.length > 0 ? "Your Search Result" : "No Search Result Found!" };
        } else {
            return { books: [], resultTitle: "No Search Result Found!" };
        }
    } catch (error) {
        console.error("Failed to fetch books:", error);
        return { books: [], resultTitle: "Failed to fetch books. Please try again later.", error };
    }
};


const fetchAuthorBirthDate = async (authorKey) => {
    try {
        const response = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
        const { birth_date: birthDate } = response.data;

        return birthDate || "N/A";
    } catch (error) {
        console.error("Failed to fetch author birth date:", error);
        return "N/A";
    }
};

const useBooks = (searchTerm) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resultTitle, setResultTitle] = useState("");

    const fetchBooksData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { books, resultTitle, error } = await fetchBooks(searchTerm);

        setBooks(books);
        setResultTitle(resultTitle);
        if (error) {
            setError(error);
        }

        setLoading(false);
    }, [searchTerm]);

    useEffect(() => {
        fetchBooksData();
    }, [searchTerm, fetchBooksData]);

    return { books, loading, error, resultTitle };
};

export default useBooks;
