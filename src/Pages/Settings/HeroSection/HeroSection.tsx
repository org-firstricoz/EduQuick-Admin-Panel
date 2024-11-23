import { FaCamera } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="pl-10 pr-10 font-poppins w-full">
      <h2 className="text-primary text-4xl font-semibold">General Settings</h2>
      <div
        className=" w-full p-2  ml-4 mr-4 rounded-xl flex flex-col"
        style={{
          height: "calc(100vh - 140px)",
        }}
      >
        <div className="border-2 w-full h-full flex rounded-xl flex-col justify-between items-center gap-6 pt-10 pb-10">
          <div className="flex flex-col gap-2 justify-center items-center">
            <input type="file" id="logo" className="hidden" accept="image/*" />
            <label
              htmlFor="logo"
              className="w-20 h-20 rounded-full flex justify-center items-center transition-all duration-200 border active:bg-[#2e2e2e] hover:bg-[#1f1f1f]"
            >
              <FaCamera className="text-3xl" />
            </label>
            <label
              htmlFor="logo"
              className="text-primary font-medium cursor-pointer"
            >
              Upload Logo
            </label>
          </div>
          <div className="flex justify-center items-center pl-20 pr-20  w-full  gap-6">
            <div className="w-1/2  flex flex-col gap-2 justify-center">
              <label
                htmlFor="SiteName"
                className="text-secondary cursor-pointer"
              >
                Name
              </label>
              <input
                type="text"
                className="p-2 w-full rounded-sm outline-none bg-[#D5D5D5] text-[#111111]"
                value={"EduQuick"}
                id="SiteName"
              />
            </div>
            <div className="w-1/2  flex flex-col gap-2 justify-center">
              <label htmlFor="role" className="text-secondary cursor-pointer">
                Role
              </label>
              <input
                type="text"
                className="p-2 w-full rounded-sm outline-none bg-[#D5D5D5] text-[#111111]"
                value={"CEO"}
                id="role"
              />
            </div>
          </div>
          <button className="bg-primary w-64 p-2 rounded-md font-medium active:bg-[#e70611c2]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
