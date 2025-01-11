import { baseURL } from "@baseURL";
import axios from "axios";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {
    const pendingToast = toast.loading("Creating account...");
    try {
      await axios.post(`${baseURL}/admin/register`, {
        fullName,
        email,
        password,
      });

      await axios.post(`${baseURL}/admin/send-otp`, {
        name: fullName,
        email,
      });

      toast.dismiss(pendingToast);
      toast.success("please verify your to join EduQuick");
      startTransition(() => {
        navigate("/otp-verification");
      });
    } catch (error) {
      console.log(error);
      toast.dismiss(pendingToast);
      if (axios.isAxiosError(error)) {
        const errMessage = error.response?.data.message;
        toast.error(errMessage);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-2">
      <div className="w-full">
        <h1 className="text-primary font-jockey font-normal text-4xl">
          EDUQUICK
        </h1>
      </div>
      <div className="w-9/12 shadow-[#000] shadow-md flex flex-col bg-secondary gap-4 rounded-md p-20">
        <h2 className="font-semibold text-4xl">Create Account</h2>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="outline-none border-b-2 w-full bg-secondary h-16 text-xl text-[#fff] placeholder:text-[#fff] "
          placeholder="Full Name"
          autoFocus
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border-b-2 w-full bg-secondary h-16 text-xl text-[#fff] placeholder:text-[#fff] "
          placeholder="Email Adress"
          // autoFocus
        />
        <div className="w-full flex items-center pr-10 h-16 border-b-2">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="outline-none  w-full bg-secondary h-full text-xl text-[#fff] placeholder:text-[#fff] "
            placeholder="Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateAccount();
              }
            }}
          />
          <div
            className="text-3xl transition-all duration-150 cursor-pointer hover:bg-[#1b1b1b] active:bg-[#272727] p-4 rounded-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </div>

        <button
          onClick={handleCreateAccount}
          className="bg-[#fff] text-[#111111] shadow-[#000] shadow-md p-3 rounded-md font-medium text-lg mt-8 active:bg-[#d4d4d4]"
        >
          Login{" "}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
