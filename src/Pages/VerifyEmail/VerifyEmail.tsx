import { baseURL } from "@baseURL";
import axios from "axios";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const validation = () => {
    if (!email) {
      toast.error("Please enter your email");
      return false;
    } else if (!email.includes("@")) {
      toast.error("Invalid email");
      return false;
    }

    return true;
  };

  const sendOTP = async () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading("OTP sending...");
    try {
      await axios.post(`${baseURL}/admin/send-otp`, {
        name: email,
        email,
      });

      toast.dismiss(pendingToast);
      toast.success("OTP sent!");
      startTransition(() => {
        navigate(`/otp-verification?email=${email}`, {
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
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="w-full">
        <h1 className="text-primary font-jockey font-normal text-4xl">
          EDUQUICK
        </h1>
      </div>
      <div className="w-2/3 shadow-[#000] shadow-md flex flex-col items-start bg-secondary gap-2 rounded-md p-24">
        <h2 className="font-semibold text-4xl">Verify Email</h2>
        <p className="text-secondary">
          Don’t worry it occurs, Please enter the email address linked with your
          account.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border-b-2 w-full bg-secondary h-16 text-xl text-[#fff] placeholder:text-[#fff] "
          placeholder="Email Adress"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendOTP();
            }
          }}
          autoFocus
        />

        <button
          onClick={sendOTP}
          className="bg-[#fff] w-full text-[#111111] shadow-[#000] shadow-md p-3 rounded-md font-medium text-lg mt-8 active:bg-[#d4d4d4]"
        >
          Verify{" "}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
