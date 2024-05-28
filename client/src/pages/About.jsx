import React from "react";

const AboutUs = () => {
  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About LitLibrary</h1>
      <p className="text-lg mb-4">
        Welcome to LitLibrary! LitLibrary is a comprehensive book management
        platform that allows you to explore and manage book records fetched
        from the Open Library API.
      </p>
      <p className="text-lg mb-4">
        Here are the key features of LitLibrary:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Paginated table listing book records fetched from the Open Library API.</li>
        <li>Support for sorting book records in ascending or descending order based on various columns.</li>
        <li>Ability to customize the number of records displayed per page, ranging from 10 to 100.</li>
        <li>Bonus points for additional features like editing rows, searching books by author, and downloading search results in CSV format.</li>
        <li>Codebase available on GitHub for collaboration and version control.</li>
      </ul>
      <p className="text-lg mb-4">
        LitLibrary is built using ReactJS and Tailwind CSS, providing a
        modern and responsive user interface. My goal is to provide a seamless
        experience for managing book records efficiently.
      </p>
      <p className="text-lg mb-4">
        To ensure secure access, I have implemented Google authentication and JWT tokens for user authentication. 
        Signing in is necessary to access book data, ensuring that your data is protected and only accessible by authorized users.
      </p>
      <p className="text-lg mb-4">
        I am continuously working to improve the functionality and usability
        of LitLibrary. Your feedback and suggestions are highly
        appreciated as I strive to make this platform better with each
        update.
      </p>
      <p className="text-lg mb-4">
        Thank you for choosing LitLibrary for all your book management needs!
      </p>
    </div>
  );
};

export default AboutUs;
