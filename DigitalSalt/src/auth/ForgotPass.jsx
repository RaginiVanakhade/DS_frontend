import { Link } from "react-router-dom";
import { useState } from "react";
import CustomBtn from "../custom/CustomBtn"
const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-2">
          Forgot Password?
        </h2>

        <p className="text-gray-500 mb-6">
          Enter your registered email.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border rounded-lg p-3 mb-5"
          />

          <CustomBtn
            text="Send Reset Link"
            onClick={() => console.log("Send reset link clicked!")}
           className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-xl transition-all duration-300"
          />

        </form>

        <p className="text-center mt-5">
          <Link to="/" className="text-violet-600">
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPass;