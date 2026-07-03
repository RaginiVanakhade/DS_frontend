import { Link } from "react-router-dom";
import CustomBtn from "../custom/CustomBtn"

const EmailVerification = () => {

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white rounded-xl shadow-lg p-8 text-center w-full max-w-md">

        <div className="text-7xl mb-4">
          ✅
        </div>

        <h2 className="text-3xl font-bold">
          Email Verified!
        </h2>

        <p className="text-gray-500 mt-3">
          Your email has been successfully verified.
        </p>

        <Link
          to="/"
          className="block mt-8 bg-violet-600 text-white py-3 rounded-lg"
        >
          Go To Login
        </Link>

        <CustomBtn
          className="text-violet-600 mt-5"
          text="Resend Verification Email"
          onClick={() => console.log("Resend verification email clicked!")}
          className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-xl transition-all duration-300"
        />

      </div>

    </div>

  );
};

export default EmailVerification;