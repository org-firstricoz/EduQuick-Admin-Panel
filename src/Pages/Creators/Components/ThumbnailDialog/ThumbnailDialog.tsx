import Dialog from "@dialog";
import { useState, useRef } from "react";
import axios from "axios";
import { baseURL } from "@baseURL";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";

interface props {
  setThumbnail: (value: string) => void;
  openThumbnailDialog: boolean;
  setOpenThumbnailDialog: (value: boolean) => void;
}

const ThumbnailDialog = ({
  setThumbnail,
  setOpenThumbnailDialog,
  openThumbnailDialog,
}: props) => {
  const [imgType, setImgType] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const token = Cookies.get("token");

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const loadingToast = toast.loading("Uploading...");

      try {
        const extension = file.type.split("/")[1];
        const type = "images";

        const uploadUrlResponse = await axios.post(
          `${baseURL}/admin/storage/upload`,
          {
            extension,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!uploadUrlResponse.data.status) {
          throw new Error(uploadUrlResponse.data.message);
        }

        const { uploadUrl } = uploadUrlResponse.data;

        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        setThumbnail(uploadUrlResponse.data.mediaUrl);
        toast.success("Upload successful!");
        setOpenThumbnailDialog(false);
      } catch (error) {
        console.error(error);
        toast.error("Error uploading file!");
      } finally {
        toast.dismiss(loadingToast);
      }
    }
  };

  return (
    <Dialog open={openThumbnailDialog} width={400} onClose={() => null}>
      <IoClose
        onClick={() => setOpenThumbnailDialog(false)}
        className="absolute right-5 top-4 cursor-pointer text-2xl"
      />
      <input
        type="file"
        accept={`image/${imgType ? imgType : "png"}`}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <select
          onChange={(e) => setImgType(e.target.value)}
          className="border outline-none rounded-md bg-[#111111] p-2 pl-6 pr-6"
        >
          <option value="">Select Image Type</option>
          <option value="png">png</option>
          <option value="jpg">jpg</option>
          <option value="jpeg">jpeg</option>
        </select>
        <button
          className="p-3 bg-primary rounded-md"
          onClick={handleChooseFile}
        >
          Choose Image
        </button>
      </div>
    </Dialog>
  );
};

export default ThumbnailDialog;
