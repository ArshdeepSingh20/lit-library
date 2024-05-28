import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex items-center justify-center px-4 sm:px-40 min-h-screen">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-3/5 flex flex-col justify-between sm:max-h-96 mb-8 sm:mb-0">
          <h1 className="text-4xl sm:text-6xl font-semibold mb-4 sm:mb-0">
            Welcome to <span className="text-[#47299f]">LitLibrary!</span>
          </h1>

          <h3 className="text-2xl sm:text-4xl text-[#555555] sm:max-w-[340px] mb-4 sm:mb-0">
            Your Ultimate Book Management Platform
          </h3>

          <p className="text-lg sm:text-xl text-[#555555] sm:max-w-[340px] mb-4 sm:mb-0">
            Effortlessly Explore, Sort, and Manage Your Book Collection with
            LitLibrary
          </p>

          <Link
            className="bg-[#1D1141] max-w-56 flex items-center justify-center text-white rounded-3xl py-3 px-6 sm:py-4 sm:px-8"
            to={"/books-details"}
          >
            <p>Go to Books Data</p>
            <ArrowRightIcon className="h-5 ml-3" />
          </Link>
        </div>
        <div className="w-full sm:w-2/5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fd35037adcd734f2b8611cb90d5f362bb%2F2822e5e91dde4981bbf663a220d198de"
            alt="Dashboard"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
