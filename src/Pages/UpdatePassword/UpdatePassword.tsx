import { baseURL } from "@baseURL";
import { useTitle } from "@hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const UpdatePassword = () => {
  const [disable, setDisable] = useState(true);

  useTitle(`Change Password • EduQuick`);

  const token = Cookies.get("token");

  const [searchQuery] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (password === confirmPassword && password.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [password, confirmPassword, disable]);

  const handleChangePassword = async () => {
    const pendingToast = toast.loading("Changing password...");
    try {
      const response = await axios.patch(
        `${baseURL}/admin/${searchQuery.get("admin")}/change-password`,
        {
          password,
        },
        {
          params: {
            id: searchQuery.get("admin"),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      toast.dismiss(pendingToast);
      console.log(error);
      if (axios.isAxiosError(error)) {
        const errMessage = error.response?.data.msg;
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
        <h2 className="font-semibold text-4xl">Set new password</h2>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none border-b-2 w-full bg-secondary h-16 text-xl text-[#fff] placeholder:text-[#fff] "
          placeholder="New password"
          autoFocus
        />
        <div className="w-full flex items-center pr-10 h-16 border-b-2">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="outline-none  w-full bg-secondary h-full text-xl text-[#fff] placeholder:text-[#fff] "
            placeholder="Confirm Password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangePassword();
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
          onClick={handleChangePassword}
          disabled={disable}
          className={`text-[#111111] shadow-[#000] shadow-md p-3 rounded-md font-medium text-lg mt-8 ${
            disable
              ? "bg-[#ffffffd2] opacity-50 cursor-not-allowed"
              : "bg-[#ffffff] hover:bg-[#f7f7f7]"
          }`}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
