import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`/api/v1/auth/sign-up`, formData);
      const data = await response.data;

      setLoading(false);

      if (data.sucess === false) {
        setError(true);
        return;
      }
      setError(false);
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className=" max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-[#1D1141] text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading ..." : "Sign up"}
        </button>
        <OAuth/>
      </form>

      <div>
        <p>
          Have an account?{" "}
          <Link to={"/sign-in"}>
            <span className="text-blue-500">Sign in</span>
          </Link>
        </p>
      </div>
      <p className="text-red-500 text-center mt-5">
        {error && "Something went wrong !!"}
      </p>
    </div>
  );
}

export default SignUp;
