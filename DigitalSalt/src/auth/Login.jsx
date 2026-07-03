import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomBtn from "../custom/CustomBtn";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data);

      alert(response.data.message);

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block mb-2">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-5">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <CustomBtn
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            text="Login"
          />

          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;