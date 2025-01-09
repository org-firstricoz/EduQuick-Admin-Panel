import { baseURL } from "@baseURL";
import Dialog from "@dialog";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  url: string;
}

const FormatDialog = ({ title, url, open, setOpen }: props) => {
  const [format, setFormat] = useState("");
  const token = Cookies.get("token");

  const validation = () => {
    if (format === "") {
      toast.error("Please select a format");
      return false;
    }

    return true;
  };

  const handleDownload = async (format: string) => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading(`Downloading your ${format} file`);
    try {
      const response = await axios.get(`${baseURL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          format: format,
          download: true,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title}.${format === "csv" ? "csv" : "xlsx"}`;
      link.click();
      toast.dismiss(pendingToast);
      toast.success("Downloaded!");
      setOpen(false);
    } catch (error) {
      toast.dismiss(pendingToast);
      toast.error("Server Error");
      console.log(error);
    }
  };

  return (
    <Dialog open={open} width={500} onClose={() => null}>
      <div className="flex flex-col justify-center items-center gap-4">
        <IoMdClose
          onClick={() => setOpen(false)}
          className="relative text-xl cursor-pointer  left-[200px]"
        />
        <h2 className="font-medium text-lg">
          Select format to download{" "}
          <span className="text-primary font-semibold"> {title}</span>
        </h2>
        <div className="flex w-full justify-center gap-10">
          <button
            onClick={() => setFormat("csv")}
            className={`${
              format === "csv" ? "bg-primary" : "border"
            } w-24 p-2 rounded-full`}
          >
            CSV
          </button>
          <button
            onClick={() => setFormat("excel")}
            className={`${
              format === "excel" ? "bg-primary" : "border"
            } w-24 p-2 rounded-full`}
          >
            Excel
          </button>
        </div>
        <button
          onClick={() => handleDownload(format)}
          className={` ${
            format === "csv" || format === "excel" ? "bg-primary" : "bg-[#111]"
          } p-2 pl-4 pr-4 rounded-full `}
        >
          Download {format.toUpperCase()}
        </button>
      </div>
    </Dialog>
  );
};

export default FormatDialog;
