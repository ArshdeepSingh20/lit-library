import axios from 'axios';

const AUTHOR_URL = "https://openlibrary.org/authors/";

const fetchAuthorDetails = async (authorKey) => {
    try {
        const response = await axios.get(`${AUTHOR_URL}${authorKey}.json`);
        console.log(response);
        const { birth_date, top_work } = response.data;

        return {
            birth_date: birth_date || "N/A",
            top_work: top_work || "N/A",
        };
    } catch (error) {
        console.error("Failed to fetch author details:", error);
        return {
            birth_date: "N/A",
            top_work: "N/A",
        };
    }
};

export default fetchAuthorDetails;
