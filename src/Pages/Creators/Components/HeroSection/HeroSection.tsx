import { MdOutlineFileUpload } from "react-icons/md";
import BG from "@creators/Assets/BG.png";
import { RiAiGenerate } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll border ml-4 rounded-md p-10 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <div className="border w-1/2 p-3 rounded-md">
        <p className="font-light">Title</p>
      </div>
      <div className="border w-1/2 p-3 rounded-md">
        <p className="font-light">Description</p>
        <p className="font-normal">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad sapiente
          rem fugit. Nemo, placeat id! Eaque cum necessitatibus reprehenderit
          eligendi laudantium voluptas quis maxime. Earum enim exercitationem
          commodi non nemo.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-1/2 p-3 rounded-md">
        <p>Thumbnail</p>
        <input type="file" id="file" className="hidden" accept="image/*" />
        <div className="flex gap-6">
          <div className="w-48 h-28 rounded-md border flex flex-col justify-center items-center">
            <label htmlFor="file">
              <MdOutlineFileUpload className="text-4xl cursor-pointer transition-all duration-150 p-1 hover:bg-[#1a1a1a] rounded-full" />
            </label>
            <label htmlFor="file" className="cursor-pointer">
              {" "}
              Upload File
            </label>
          </div>
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
      </div>
      <div className="flex flex-col gap-2 w-1/2 p-3 rounded-md">
        <p>Select Video</p>
        <input type="file" id="Videofile" className="hidden" accept="video/*" />
        <div className="flex items-center gap-2">
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
        <select className="bg-[#111111] rounded-md outline-none border w-32 text-center p-2">
          <option value="">Select</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className=" w-1/2 p-3 flex flex-col gap-2">
        <p>Trending</p>
        <select className="bg-[#111111] rounded-md outline-none border w-32 text-center p-2">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className=" w-1/2 p-3 flex flex-col gap-2">
        <p>Tags</p>
        <div className="bg-[#111111] flex items-center justify-between rounded-md outline-none border w-full p-2">
          <div>
            <p>Bussiness</p>
          </div>
          <button className="border p-1 pl-4 pr-4 rounded-full">
            Add tags
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
