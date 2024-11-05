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
        <div className="border-2 w-full h-full flex flex-col items-center gap-6 justify-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            <input type="file" id="logo" className="hidden" />
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
                Site Name
              </label>
              <input
                type="text"
                className="p-2 w-full rounded-sm outline-none bg-[#D5D5D5] text-[#111111]"
                value={"EduQuick"}
                id="SiteName"
              />
            </div>
            <div className="w-1/2  flex flex-col gap-2 justify-center">
              <label
                htmlFor="CopyRight"
                className="text-secondary cursor-pointer"
              >
                Copy Right
              </label>
              <input
                type="text"
                className="p-2 w-full rounded-sm outline-none bg-[#D5D5D5] text-[#111111]"
                value={"All rights Reserved@EduQuick"}
                id="CopyRight"
              />
            </div>
          </div>
          <div className="flex justify-center items-center pl-20 pr-20  w-full  gap-6">
            <div className="w-full flex flex-col gap-4">
              <div className=" flex flex-col gap-2 justify-center">
                <label
                  htmlFor="CEOTitle"
                  className="text-secondary cursor-pointer"
                >
                  CEO Title
                </label>
                <input
                  type="text"
                  className="p-2 w-full rounded-sm outline-none bg-[#D5D5D5] text-[#111111]"
                  value={"EduQuick is a hybrid dashboard"}
                  id="CEOTitle"
                />
              </div>
              <div className="  flex flex-col gap-2 justify-center">
                <label
                  htmlFor="CEOKeywords"
                  className="text-secondary cursor-pointer"
                >
                  CEO Keywords
                </label>
                <input
                  type="text"
                  className="p-2 w-full rounded-sm outline-none bg-[#D5D5D5] text-[#111111]"
                  value={"CEO"}
                  id="CEOKeywords"
                />
              </div>
            </div>
            <div className="w-full h-full ">
              <div className="  h-full flex flex-col gap-2 justify-center">
                <label
                  htmlFor="CEODescription"
                  className="text-secondary cursor-pointer"
                >
                  CEO Description
                </label>
                <textarea
                  className="p-2 w-full h-full rounded-sm outline-none bg-[#D5D5D5] text-[#111111]"
                  value={"EduQuick is a hybrid dashboard"}
                  id="CEODescription"
                />
              </div>
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
