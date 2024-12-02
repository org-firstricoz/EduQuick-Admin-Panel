import { startTransition, useEffect, useRef, useState } from "react";
import { MdOutlineDelete, MdOutlineFileUpload } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import BG from "@creators/Assets/BG.png";
import Dialog from "../../../../Components/Dialog/Dialog";
import { IoMdClose } from "react-icons/io";
import { FaRegFile } from "react-icons/fa";
import axios from "axios";
import { baseURL } from "../../../../baseURL";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import VideoDialog from "@creators/Components/VideoDialog/VideoDialog";
import AddTags from "@creators/Components/AddTags/AddTags";

interface Course {
  avgRating?: string;
  category?: string;
  createdAt?: string;
  description?: string;
  freeCourse?: boolean;
  imgUrl?: string;
  rating?: string;
  tags?: string[];
  title?: string;
  trending?: boolean;
  updatedAt?: string;
  videoIds?: string[];
  views?: string;
  __v?: string;
  _id?: string;
}

const HeroSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course>({});

  const [open, setOpen] = useState<boolean>(false);
  const [openVideoDialog, setOpenVideoDialog] = useState<boolean>(false);
  const [openTagDialog, setOpenTagDialog] = useState<boolean>(false);

  const [imgType, setImgType] = useState("");
  const hiddenInput = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [trending, setTrending] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const getCurrentCourse = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/course-by-courseId?id=${id}`
      );
      const fetchedCourse = response.data.course;

      setCourse(fetchedCourse);
      setTitle(fetchedCourse.title || "");
      setDescription(fetchedCourse.description || "");
      setThumbnail(fetchedCourse.imgUrl || "");
      setCategory(fetchedCourse.category || "");
      setTrending(fetchedCourse.trending || Boolean);
      setTags(fetchedCourse.tags);
      setVideoIds(fetchedCourse.videoIds);
    } catch (error) {
      console.log(error);
      let errorMessage = "Error";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      console.log(errorMessage);
    }
  };
  useEffect(() => {
    getCurrentCourse();
  }, [id]);

  const validation = () => {
    if (imgType === "") {
      alert("Image Type is required!...");
      return false;
    }
    return true;
  };

  const handleChooseFile = () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }

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
        const type = "images";

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

        const { uploadUrl } = uploadUrlResponse.data;

        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        setThumbnail(uploadUrlResponse.data.mediaUrl);
        toast.success("Upload successful!");
      } catch (error) {
        console.error(error);
        toast.error("Error uploading file!");
      } finally {
        toast.dismiss(loadingToast);
      }

      setOpen(false);
    }
  };

  const courseValidation = () => {
    if (title === "") {
      toast.error("Title is required!");
      return false;
    }
    if (description === "") {
      toast.error("Description is required!");
      return false;
    }
    if (tags.length < 0) {
      toast.error("Tags are required!");
    }

    return true;
  };

  const handleUpdateCourse = async () => {
    const isValid = courseValidation();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading("Updating course!...");
    try {
      setVideoIds(videoIds);
      setTags(tags);
      const response = await axios.patch(
        `${baseURL}/admin/update-course`,
        {
          id,
          title,
          description,
          imgUrl: thumbnail,
          videoIds,
          category,
          trending,
          freeCourse: true,
          uploadedBy: "671943662e172cfd42b047a9",
          tags,
        },
        { withCredentials: true }
      );

      if (response.data.status) {
        toast.dismiss(pendingToast);
        toast.success("Course updated!");
        setCategory("");
        setDescription("");
        setImgType("");
        setThumbnail("");
        setTitle("");
        setTrending(false);
        setVideoIds([]);
      }
      startTransition(() => {
        navigate("/products");
      });
      setCourse(course);
    } catch (error) {
      toast.dismiss(pendingToast);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
        console.log(errorMessage);
      }
    }
  };

  //   const handleClose = () => {};

  return (
    <div className=" w-full h-full  overflow-scroll  rounded-md p-10 flex flex-col gap-4 font-poppins">
      <h2 className="mt-4 mb-6 text-3xl text-center font-semibold">
        Update course
      </h2>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Title"
        className="border placeholder:text-[#fff] bg-[#111] w-1/2 p-3 rounded-md"
      />

      <div className="border w-1/2 p-3 rounded-md">
        <p className="font-light">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="font-normal bg-[#111] w-full outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 w-1/2 p-3 rounded-md">
        <p>Thumbnail</p>
        <div className="flex gap-6">
          {thumbnail ? (
            <div>
              <div
                className="w-48 h-28 bg-primary bg-cover bg-no-repeat rounded-md"
                style={{ backgroundImage: `url(${thumbnail})` }}
              />
              <button
                onClick={() => setOpen(true)}
                className="p-2 pl-5 pr-5 transition-all duration-300 rounded-full mt-2 hover:bg-[#1b1b1b]"
              >
                Choose again
              </button>
            </div>
          ) : (
            <div
              onClick={() => setOpen(true)}
              className="w-48 h-28 rounded-md border flex flex-col justify-center items-center"
            >
              <MdOutlineFileUpload className="text-4xl cursor-pointer transition-all duration-150 p-1 hover:bg-[#1a1a1a] rounded-full" />

              <label className="cursor-pointer"> Upload File</label>
            </div>
          )}

          <div
            className="w-48 h-28 rounded-md border"
            style={{
              backgroundImage: `url(${BG})`,
              backgroundSize: "cover",
            }}
          >
            <div className="w-full h-full bg-[#1a1a1a83] rounded-md flex flex-col justify-center items-center">
              <RiAiGenerate className="text-4xl cursor-pointer transition-all duration-150 p-1 hover:bg-[#1a1a1a] rounded-full" />
              <p className="cursor-pointer">Auto-Generated</p>
            </div>
          </div>
        </div>
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="hidden"
          ref={hiddenInput}
          accept={`image/${imgType || "png,jpeg,jpg"}`}
        />
        <Dialog width={400} open={open} onClose={() => null}>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-2xl"
          >
            <IoMdClose />
          </button>
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
            <p>Image Type</p>
            <select
              className="bg-[#000] text-center p-2 border outline-none rounded-md"
              onChange={(e) => setImgType(e.target.value)}
            >
              <option value="">Select Image Type</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>
          <div className="w-full mt-4 h-full flex flex-col gap-2 justify-center items-center">
            <p>Image Content</p>
            <input
              type="text"
              className="p-2 w-2/3 border rounded-md bg-[#000] text-[#fff]"
              placeholder="Bussiness"
            />
            <button
              onClick={handleChooseFile}
              className="mt-4 p-2 pl-5 pr-5 bg-primary rounded-md"
            >
              Done
            </button>
          </div>
        </Dialog>
      </div>
      <div className="flex flex-col gap-2 w-1/2 p-3 rounded-md">
        <VideoDialog
          openVideoDialog={openVideoDialog}
          setOpenVideoDialog={setOpenVideoDialog}
          videoIds={videoIds}
        />
        <p>Select Video</p>

        <div
          onClick={() => setOpenVideoDialog(true)}
          className="flex items-center gap-2"
        >
          <div className="w-48 h-10 rounded-md p-1 gap-1 border flex flex-row-reverse justify-center items-center">
            <label htmlFor="Videofile">
              <MdOutlineFileUpload className="text-4xl cursor-pointer transition-all duration-150 p-1 hover:bg-[#1a1a1a] rounded-full" />
            </label>
            <label htmlFor="file" className="cursor-pointer">
              {" "}
              Upload File
            </label>
          </div>
          <div className="w-72 h-14 bg-[#FFFFFF38] rounded-md ">
            <div className="flex  items-center h-full pl-2">
              <FaRegFile className="text-2xl" />
              <div className="flex flex-col gap-2 pl-2 pr-2 h-full justify-center w-full">
                <div className="flex items-center justify-between">
                  <p className="text-xs">img title.png</p>
                  <button className="bg-[#000] text-[#fff] text-xs p-1 pl-4 pr-4 rounded-full">
                    Edit
                  </button>
                  <MdOutlineDelete className="text-2xl text-primary" />
                </div>
                <div className="w-full h-1 bg-primary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-1/2 p-3 flex flex-col gap-2">
        <p>Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="bg-[#111111] rounded-md outline-none border w-fit text-center p-2"
        >
          <option value="">Select Category</option>
          <option value="Mobile Tricks">Mobile Tricks</option>
          <option value="Share Market">Share Market</option>
          <option value="YouTube">YouTube</option>
          <option value="Part Time">Part Time</option>
          <option value="Astrology">Astrology</option>
          <option value="Sarkari Kaam">Sarkari Kaam</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div className=" w-1/2 p-3 flex flex-col gap-2">
        <p>Trending</p>
        <select
          className="bg-[#111111] rounded-md outline-none border w-32 text-center p-2"
          value={trending ? "true" : "false"} // Set the value based on the boolean state
          onChange={(e) => setTrending(e.target.value === "true")}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className=" w-1/2 p-3 flex flex-col gap-2">
        <AddTags
          setOpenTagDialog={setOpenTagDialog}
          openTagDialog={openTagDialog}
          tags={tags}
        />
        <p>Tags</p>
        <div className="bg-[#111111] flex items-center justify-between rounded-md outline-none border w-full p-2">
          <div className="grid grid-cols-3 gap-3">
            {tags.map((tag, i) => (
              <p
                key={i}
                className="border flex items-center justify-between p-3 rounded-full"
              >
                {tag}
                <span
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className=" cursor-pointer text-2xl"
                >
                  <IoMdClose />
                </span>
              </p>
            ))}
          </div>
          <button
            onClick={() => setOpenTagDialog(true)}
            className="border p-1 pl-4 pr-4 rounded-full"
          >
            Add tags
          </button>
        </div>
      </div>
      <button
        onClick={handleUpdateCourse}
        className="fixed bottom-10 right-10 bg-primary p-2 pl-6 pr-6 rounded-md"
      >
        Upload
      </button>
    </div>
  );
};

export default HeroSection;
