import { baseURL } from "@baseURL";
import { useTitle } from "@hooks";
import axios from "axios";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  useTitle("Register Admin • EduQuick");

  const navigate = useNavigate();

  const [showOTP, setShowOTP] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [specializtion, setSpecializtion] = useState("Other");

  const [otp, setOtp] = useState("");

  const [passError, setPassError] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const errors = [];
    const regexCapital = /[A-Z]/;
    const regexNumber = /\d/;
    const regexSpecial = /[@$!%*?&#]/;
    const regexLength = /.{8,}/;

    if (!regexCapital.test(password)) {
      errors.push("Password must include at least one capital letter.");
    }
    if (!regexNumber.test(password)) {
      errors.push("Password must include at least one number.");
    }
    if (!regexSpecial.test(password)) {
      errors.push("Password must include at least one special character.");
    }
    if (!regexLength.test(password)) {
      errors.push("Password must be at least 8 characters long.");
    }

    return errors;
  };

  const handleCreateAccount = async () => {
    const pendingToast = toast.loading("Sending OTP...");
    try {
      await axios.post(`${baseURL}/admin/send-otp`, {
        email,
      });

      toast.dismiss(pendingToast);
      toast.success("please verify your email to join EduQuick");
      setShowOTP(true);
    } catch (error) {
      console.log(error);
      toast.dismiss(pendingToast);
      if (axios.isAxiosError(error)) {
        const errMessage = error.response?.data.message;
        toast.error(errMessage);
      }
    }
  };

  const validation = () => {
    if (otp === "") {
      toast.error("OTP required!");
      return false;
    }
    return true;
  };

  const verifyOTP = async () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading("Verifying OTP..");

    try {
      await axios.post(`${baseURL}/admin/verify-otp`, {
        email,
        otp,
      });

      toast.dismiss(pendingToast);

      await axios.post(`${baseURL}/admin/register`, {
        fullName,
        email,
        password,
        role,
        specializtion,
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

  const sendOTP = async () => {
    const pendingToast = toast.loading("OTP sending...");
    try {
      await axios.post(`${baseURL}/admin/send-otp`, {
        name,
        email,
      });

      toast.dismiss(pendingToast);
      toast.success("OTP sent!");
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

      {showOTP ? (
        <div className="w-2/3 shadow-[#000] shadow-md flex flex-col items-start bg-secondary gap-2 rounded-md p-24">
          <h2 className="font-semibold text-4xl">OTP Verification</h2>
          <p className="text-secondary">
            Enter the verification code we just sent on your email address
          </p>

          <OTPInput
            value={otp}
            onChange={setOtp}
            containerStyle={{
              justifyContent: "space-between",
              gap: "7rem",
              marginTop: "1rem",
            }}
            inputStyle={{
              color: "#E52E2E",
              outline: "none",
              padding: "5px ",
              borderRadius: "10px",
              width: "80px",
              height: "80px",
              fontSize: "2rem",
              fontWeight: "700",
            }}
            numInputs={4}
            shouldAutoFocus
            //   renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />

          <button
            onClick={verifyOTP}
            className="bg-[#fff] w-full text-[#111111] shadow-[#000] shadow-md p-3 rounded-md font-medium text-lg mt-8 active:bg-[#d4d4d4]"
          >
            Verify{" "}
          </button>

          <div className="flex w-full justify-center">
            <p className="text-center font-normal text-xl mt-6">
              Don't received code?{" "}
              <span
                className="text-primary font-medium cursor-pointer"
                onClick={sendOTP}
              >
                Resend
              </span>{" "}
            </p>
          </div>
        </div>
      ) : (
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
              onChange={(e) => {
                setPassword(e.target.value);
                setPassError(validatePassword(password));
              }}
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

          <ul style={{ color: "red" }}>
            {passError.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>

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
      )}
    </div>
  );
};

export default SignUp;
