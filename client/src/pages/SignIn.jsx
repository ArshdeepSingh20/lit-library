import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});

  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await axios.post(`/api/v1/auth/sign-in`, formData);
      const data = await response.data;
      console.log(data);

      if (data.sucess === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      console.log(error);
    }
  };

  return (
    <div className=" max-w-lg p-3 mx-auto">
      <h1 className="text-3xl text-center font-semibold my-8">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading ..." : "Sign in"}
        </button>
        <OAuth/>
      </form>

      <div>
        <p>
          Don't have an account?{" "}
          <Link to={"/sign-up"}>
            <span className="text-blue-500">Sign up</span>
          </Link>
        </p>
      </div>
      <p className="text-red-500 text-center mt-5">
        {error ? error.message || "Something went wrong, please try again !!" : ""}
      </p>
    </div>
  );
}

export default SignIn;
