import { useState } from "react";
import CustomBtn from "../custom/CustomBtn"

const ResetPass = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password, confirmPassword);
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New Password"
            className="w-full border rounded-lg p-3 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3 mb-5"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <CustomBtn
            className="w-full bg-violet-600 text-white rounded-lg py-3"
            text="Reset Password"
            onClick={() => console.log("Reset password clicked!")}
          />

        </form>

      </div>

    </div>

  );
};

export default ResetPass;