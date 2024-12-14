import Dialog from "@dialog";
import { useState, useRef } from "react";
import axios from "axios";
import { baseURL } from "@baseURL";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import ThumbnailDialog from "../ThumbnailDialog/ThumbnailDialog";
import Cookies from "js-cookie";

interface props {
  openVideoDialog: boolean;
  setOpenVideoDialog: (value: boolean) => void;
  videoIds: string[];
  uploadedBy: string;
}

const VideoDialog = ({
  openVideoDialog,
  setOpenVideoDialog,
  videoIds,
  uploadedBy,
}: props) => {
  const token = Cookies.get("token");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openThumbnailDialog, setOpenThumbnailDialog] =
    useState<boolean>(false);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [quality, setQuality] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSequence, setVideoSequence] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleChooseVideoFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileVideoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
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

        console.log(uploadUrlResponse.data);
        setVideoUrl(uploadUrlResponse.data.mediaUrl);

        if (!uploadUrlResponse.data.status) {
          throw new Error(uploadUrlResponse.data.message);
        }

        const { uploadUrl } = uploadUrlResponse.data;

        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        toast.success("Upload successful!");
      } catch (error) {
        console.error(error);
        toast.error("Error uploading file!");
      } finally {
        toast.dismiss(loadingToast);
      }
    }
  };

  const handleUploadVideo = async () => {
    const pendingToast = toast.loading("Upload Video...");
    try {
      const response = await axios.post(
        `${baseURL}/admin/video`,
        {
          title,
          videoUrl,
          videoSequence,
          description,
          thumbnailUrl: thumbnail,
          quality,
          duration,
          uploadedBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.status) {
        toast.dismiss(pendingToast);
        toast.success(response.data.message);
        videoIds.push(response.data.videoId);
        setOpenVideoDialog(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.dismiss(pendingToast);
        const errorMessage =
          error.response?.data.error || error.response?.data.message;
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Dialog open={openVideoDialog} width={1000} onClose={() => null}>
      <IoClose
        onClick={() => setOpenVideoDialog(false)}
        className="absolute right-5 top-4 cursor-pointer text-2xl"
      />
      <input
        type="file"
        accept={`video/*`}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileVideoChange}
      />

      <div className="w-full flex flex-col gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-1/2 bg-[#111111] outline-none border p-3 text-lg rounded-md"
        />
        <div className="w-1/2 border rounded-md ">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-md p-2 text-lg outline-none h-16 bg-[#111111]"
          />
        </div>
        <input
          value={videoSequence}
          onChange={(e) => setVideoSequence(e.target.value)}
          type="number"
          placeholder="Video Sequence"
          className="w-fit bg-[#111111] outline-none border p-3 text-lg rounded-md"
        />
        <div>
          <ThumbnailDialog
            openThumbnailDialog={openThumbnailDialog}
            setOpenThumbnailDialog={setOpenThumbnailDialog}
            setThumbnail={setThumbnail}
          />
          <label>Thumbnail</label>
          <div
            onClick={() => setOpenThumbnailDialog(true)}
            className="border cursor-pointer rounded-md w-48 flex items-center justify-center text-lg h-28"
          >
            {thumbnail ? (
              <>
                <div
                  className="w-full h-full bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${thumbnail})`,
                  }}
                />
              </>
            ) : (
              " upload file"
            )}
          </div>
          {thumbnail && (
            <button
              onClick={() => setOpenThumbnailDialog(true)}
              className="mt-4 p-2 pl-6 pr-6 border rounded-md"
            >
              Choose again
            </button>
          )}
        </div>
        Video:
        <div
          onClick={handleChooseVideoFile}
          className="border rounded-md w-48 flex items-center justify-center text-lg h-fit p-2"
        >
          upload file
        </div>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="Video duration"
          className="w-1/2 bg-[#111111] outline-none border p-3 text-lg rounded-md"
        />
        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="w-fit bg-[#111111] p-2 border outline-none rounded-md"
        >
          <option>Select</option>
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
          <option value="360p">360p</option>
          <option value="240p">240p</option>
        </select>
        <button
          className="bg-primary pl-6 pr-6 p-2 rounded-md w-fit"
          onClick={handleUploadVideo}
        >
          Upload Video
        </button>
      </div>
    </Dialog>
  );
};

export default VideoDialog;
