import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="w-full">
        <h1 className="text-primary font-jockey font-normal text-4xl">
          EDUQUICK
        </h1>
      </div>
      <div className="w-9/12 border flex flex-col gap-4 rounded-md p-24">
        <h2 className="font-semibold text-4xl">Account Login</h2>
        <input
          type="text"
          className="outline-none border-b-2 w-full bg-[#111111] h-16 text-xl text-[#fff] placeholder:text-[#fff] "
          placeholder="Email Adress"
        />
        <div className="w-full flex items-center pr-10 h-16 border-b-2">
          <input
            type={showPassword ? "text" : "password"}
            className="outline-none  w-full bg-[#111111] h-full text-xl text-[#fff] placeholder:text-[#fff] "
            placeholder="Password"
          />
          <div
            className="text-3xl transition-all duration-150 cursor-pointer hover:bg-[#1b1b1b] active:bg-[#272727] p-4 rounded-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input type="checkbox" className="accent-[#fff] size-6 " id="login" />
          <label
            htmlFor="login"
            className="font-poppins text-lg cursor-pointer"
          >
            Keep me logged in
          </label>
        </div>

        <button className="bg-[#fff] text-[#111111] p-3 rounded-md font-medium text-lg mt-8 active:bg-[#d4d4d4]">
          Login{" "}
        </button>
        <p className="text-lg font-medium text-center">
          Forgot you Password?{" "}
          <span className="underline cursor-pointer">Reset Password</span>
        </p>

        <p className="text-lg font-medium text-center">
          New to EduQuick? Start learning with us today.{" "}
          <span className="text-primary cursor-pointer">Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
