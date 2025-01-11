import { baseURL } from "@baseURL";
import axios from "axios";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const validation = () => {
    if (otp === "") {
      toast.error("OTP required!");
      return false;
    }
    if (email === "") {
      toast.error("Email is required!");
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

      startTransition(() => {
        navigate("/login");
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
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="w-full">
        <h1 className="text-primary font-jockey font-normal text-4xl">
          EDUQUICK
        </h1>
      </div>
      <div className="w-9/12 shadow-[#000] shadow-md flex flex-col bg-secondary gap-4 rounded-md p-24">
        <h2 className="font-semibold text-4xl">OTP Verification</h2>
        <p className="text-secondary">
          Enter the verification code & email we just sent on your email address
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border-b-2 w-full bg-secondary h-16 text-xl text-[#fff] placeholder:text-[#fff] "
          placeholder="Verify Email Adress"
          // autoFocus
        />

        <OtpInput
          value={otp}
          onChange={setOtp}
          containerStyle={{
            justifyContent: "center",
            gap: "5rem",
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
          className="bg-[#fff] text-[#111111] shadow-[#000] shadow-md p-3 rounded-md font-medium text-lg mt-8 active:bg-[#d4d4d4]"
        >
          Verify{" "}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
