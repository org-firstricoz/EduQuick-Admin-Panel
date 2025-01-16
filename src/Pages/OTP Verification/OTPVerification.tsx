import { baseURL } from "@baseURL";
import { useTitle } from "@hooks";
import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const OTPVerification = () => {
  const location = useLocation();

  const from = location.state?.from;

  useEffect(() => {
    if (!from) {
      navigate("/not-found");
    }
  });

  console.log(from);

  const [otp, setOtp] = useState("");

  const [searchQuery] = useSearchParams();

  const name = searchQuery.get("name");
  const email = searchQuery.get("email");

  useTitle("Verify OTP • EduQuick");

  const navigate = useNavigate();

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

      startTransition(() => {
        if (from === "/sign-up") {
          navigate("/login");
        } else if (from === "/verify-email") {
          navigate(`/admin/change-password?admin=${email}`, {
            state: { from: location.pathname },
          });
        }
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
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="w-full">
        <h1 className="text-primary font-jockey font-normal text-4xl">
          EDUQUICK
        </h1>
      </div>
      <div className="w-2/3 shadow-[#000] shadow-md flex flex-col items-start bg-secondary gap-2 rounded-md p-24">
        <h2 className="font-semibold text-4xl">OTP Verification</h2>
        <p className="text-secondary">
          Enter the verification code we just sent on your email address
        </p>

        <OtpInput
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
    </div>
  );
};

export default OTPVerification;
