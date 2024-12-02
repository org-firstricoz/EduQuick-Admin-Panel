import { IoMdClose } from "react-icons/io";
import Dialog from "../../../../Components/Dialog/Dialog";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineFileUpload } from "react-icons/md";
import { baseURL } from "../../../../baseURL";
import axios from "axios";

interface props {
  openVideoDialog: boolean;
  setOpenVideoDialog: (value: boolean) => void;
  videoIds: string[];
}

const videoDialog = ({
  openVideoDialog,
  setOpenVideoDialog,
  videoIds,
}: props) => {
  const hiddenInput = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [videoSequence, setVideoSequence] = useState("");

  const validation = () => {
    if (title === "") {
      toast.error("Title is require");
      return false;
    }
    if (videoUrl === "") {
      toast.error("File is required is require");
      return false;
    }
    if (videoSequence === "") {
      toast.error("Video seriel required is require");
      return false;
    }
    if (description === "") {
      toast.error("Description is require");
      return false;
    }
    return true;
  };

  const handleChooseFile = () => {
    if (hiddenInput.current) {
      hiddenInput.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const loadingToast = toast.loading("Uploading...");

      try {
        const extension = file.type.split("/")[1];
        const type = "videos";

        const uploadUrlResponse = await axios.post(
          `${baseURL}/admin/storage/upload`,
          {
            extension,
            type,
          }
        );

        if (!uploadUrlResponse.data.status) {
          throw new Error(uploadUrlResponse.data.message);
        }

        console.log(uploadUrlResponse);

        const { uploadUrl } = uploadUrlResponse.data;

        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        setVideoUrl(uploadUrlResponse.data.mediaUrl);
        toast.success("Upload successful!");
      } catch (error) {
        console.error(error);
        toast.error("Error uploading file!");
      } finally {
        toast.dismiss(loadingToast);
      }
    }
  };

  const addVideoId = (videoId: string) => {
    videoIds.push(videoId);
  };

  const handleVideoUpload = async () => {
    const isValid = validation();
    if (!isValid) return;
    const pendingToast = toast.loading("Uploading Video!");
    try {
      const response = await axios.post(`${baseURL}/admin/video`, {
        title,
        videoUrl,
        description,
        videoSequence,
        duration: 8,
        uploadedBy: "671943662e172cfd42b047a9",
      });
      console.log(response);
      if (response.data.status) {
        toast.dismiss(pendingToast);
        const videoId: string = response.data.videoId;
        addVideoId(videoId);
        toast.success("Video uploaded!");
        setOpenVideoDialog(false);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(pendingToast);
      toast.error("Error while uploading Video");
    }
  };

  const handleClose = () => {};

  return (
    <Dialog width={1000} open={openVideoDialog} onClose={handleClose}>
      <div className="w-full h-full flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="hidden"
          ref={hiddenInput}
          accept={`video/*`}
        />
        <button
          onClick={() => setOpenVideoDialog(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          <IoMdClose />
        </button>
        <h2 className="text-2xl">Details</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border placeholder:text-[#fff] bg-[#111] w-1/2 p-3 rounded-md"
        />
        <div
          onClick={handleChooseFile}
          className="w-48 h-10 rounded-md p-1 gap-1 border flex flex-row-reverse justify-center items-center"
        >
          <label htmlFor="Videofile">
            <MdOutlineFileUpload className="text-4xl cursor-pointer transition-all duration-150 p-1 hover:bg-[#1a1a1a] rounded-full" />
          </label>
          <label htmlFor="file" className="cursor-pointer">
            {" "}
            Upload File
          </label>
        </div>
        <p>Video series</p>
        <input
          value={videoSequence}
          type="text"
          onChange={(e) => setVideoSequence(e.target.value)}
          className="border text-center placeholder:text-[#fff] bg-[#111] w-12 p-3 rounded-md"
        />
        <div className="border w-1/2 p-3 rounded-md">
          <p className="font-light">Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="font-normal bg-[#111] w-full outline-none"
          />
        </div>
        <button
          onClick={handleVideoUpload}
          className="mt-4 p-2 pl-5 pr-5 w-20 bg-primary rounded-md"
        >
          Done
        </button>
      </div>
    </Dialog>
  );
};

export default videoDialog;
