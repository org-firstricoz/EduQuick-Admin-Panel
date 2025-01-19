import { baseURL } from "@baseURL";
import { useTitle } from "@hooks";
import axios from "axios";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  useTitle("Register Admin • EduQuick");

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [specializtion, setSpecializtion] = useState("Other");

  const handleCreateAccount = async () => {
    const pendingToast = toast.loading("Creating account...");
    try {
      await axios.post(`${baseURL}/admin/register`, {
        fullName,
        email,
        password,
        role,
        specializtion,
      });

      await axios.post(`${baseURL}/admin/send-otp`, {
        name: fullName,
        email,
      });

      toast.dismiss(pendingToast);
      toast.success("please verify your email to join EduQuick");
      startTransition(() => {
        navigate(`/otp-verification?email=${email}&name=${fullName}`, {
          state: { from: location.pathname },
        });
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
      <div className="w-9/12 shadow-[#000] shadow-md flex flex-col bg-secondary gap-4 rounded-md p-10">
        <h2 className="font-semibold text-4xl">Create Account</h2>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="outline-none  border-b w-full bg-secondary h-12 text-lg text-[#fff] placeholder:text-[#fff] "
          placeholder="Full Name"
          autoFocus
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none  border-b w-full bg-secondary h-12 text-lg text-[#fff] placeholder:text-[#fff] "
          placeholder="Email Adress"
          // autoFocus
        />
        <div className="w-full flex items-center pr-10 h-12  border-b">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="outline-none  w-full bg-secondary h-full text-lg text-[#fff] placeholder:text-[#fff] "
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

        <select
          className="bg-secondary p-2 text-lg border rounded-md"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="Admin">Admin</option>
          <option value="Super Admin">Super Admin</option>
        </select>
        <select
          className="bg-secondary p-2 text-lg border rounded-md"
          onChange={(e) => setSpecializtion(e.target.value)}
          value={specializtion}
        >
          <option value="Customer Support">Customer Support</option>
          <option value="Complaint Support">Complaint Support</option>
          <option value="Sales Support">Sales Support</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={handleCreateAccount}
          className="bg-[#fff] text-[#111111] shadow-[#000] shadow-md p-3 rounded-md font-medium text-lg mt-8 active:bg-[#d4d4d4]"
        >
          Register as Admin{" "}
        </button>
        <p
          onClick={() => {
            startTransition(() => {
              navigate("/login");
            });
          }}
          className="text-center font-medium text-lg"
        >
          Already have an account?{" "}
          <span className="text-primary cursor-pointer font-semibold">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
