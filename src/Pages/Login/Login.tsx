import axios from "axios";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { baseURL } from "../../baseURL";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTitle } from "@hooks";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  useTitle("Login • EduQuick");

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validation = () => {
    if (email === "") {
      toast.error("Email is required!");
      return false;
    }
    if (password === "") {
      toast.error("Password is required!");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading("Loging in...");
    try {
      const response = await axios.post(
        `${baseURL}/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.dismiss(pendingToast);
        toast.success("Login successful!");
        const token = response.data.token;
        console.log(token);
        Cookies.set("token", token);
        localStorage.setItem("token", token);
        startTransition(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(pendingToast);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage || "Server error");
      }
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="w-full">
        <h1 className="text-primary font-jockey font-normal text-4xl">
          EDUQUICK
        </h1>
      </div>
      <div className="w-9/12 shadow-[#000] shadow-md flex flex-col bg-secondary dark:bg-[#fff] gap-4 rounded-md p-16">
        <h2 className="font-semibold text-4xl">Account Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border-b-2 w-full bg-secondary dark:bg-[#fff] dark:text-[#111] dark:placeholder:text-[#111] h-16 text-xl text-[#fff] placeholder:text-[#fff] "
          placeholder="Email Adress"
          autoFocus
        />
        <div className="w-full flex items-center pr-10 h-16 border-b-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="outline-none  w-full bg-secondary dark:bg-[#fff] dark:text-[#111] dark:placeholder:text-[#111] h-full text-xl text-[#fff] placeholder:text-[#fff] "
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <div
            className="text-3xl transition-all duration-150 cursor-pointer hover:bg-[#1b1b1b] dark:hover:bg-[#e2e2e2] active:bg-[#272727] p-4 rounded-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>

        {/* <div className="flex items-center gap-4">
          <input type="checkbox" className="accent-[#fff] size-6 " id="login" />
          <label
            htmlFor="login"
            className="font-poppins text-lg cursor-pointer"
          >
            Keep me logged in
          </label>
        </div> */}

        <button
          onClick={handleLogin}
          className="bg-[#fff] text-[#111111] shadow-[#000] shadow-md p-3 rounded-md font-medium text-lg mt-8 active:bg-[#d4d4d4]"
        >
          Login{" "}
        </button>
        <p className="text-lg font-medium text-center">
          Forgot you Password?{" "}
          <span
            onClick={() => {
              startTransition(() => {
                navigate("/verify-email");
              });
            }}
            className="underline cursor-pointer"
          >
            Reset Password
          </span>
        </p>

        <p className="text-lg font-medium text-center">
          New to EduQuick? Start learning with us today.{" "}
          <span
            onClick={() => {
              startTransition(() => {
                navigate("/sign-up");
              });
            }}
            className="text-primary cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
