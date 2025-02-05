import Skeleton from "react-loading-skeleton";

const DashboardLoader = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 63px)",
      }}
    >
      <div className=" w-full bg-secondary dark:bg-[#fff] dark:border p-4 rounded-xl dark:shadow-sm shadow-[#0a0a0a] shadow-xl ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <Skeleton width={200} height={20} />
            <Skeleton width={150} height={10} />
          </div>
        </div>
        <div className="flex items-center  justify-center gap-6 mt-4">
          <div className="w-60 shadow-[#000] shadow-md flex cursor-pointer hover:scale-105 transition-all duration-300 flex-col gap-2 h-fit  p-6 rounded-2xl">
            <Skeleton
              width={35}
              height={35}
              style={{
                borderRadius: "50%",
              }}
            />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
          </div>
          <div className="w-60 shadow-[#000] shadow-md flex cursor-pointer hover:scale-105 transition-all duration-300 flex-col gap-2 h-fit  p-6 rounded-2xl">
            <Skeleton
              width={35}
              height={35}
              style={{
                borderRadius: "50%",
              }}
            />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
          </div>
          <div className="w-60 shadow-[#000] shadow-md flex cursor-pointer hover:scale-105 transition-all duration-300 flex-col gap-2 h-fit  p-6 rounded-2xl">
            <Skeleton
              width={35}
              height={35}
              style={{
                borderRadius: "50%",
              }}
            />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
          </div>
        </div>
      </div>

      <div className="w-full  bg-secondary dark:bg-[#fff] p-4 rounded-xl dark:shadow-sm dark:border shadow-[#0a0a0a] shadow-xl">
        <Skeleton width={200} height={20} />
        <Skeleton width={5} height={200} className="ml-24 mt-2" />
        <Skeleton width={900} height={5} className="ml-24 mt-2" />
        <div className="flex justify-center gap-6 ml-10">
          <Skeleton width={110} height={20} />
          <Skeleton width={110} height={20} />
          <Skeleton width={110} height={20} />
          <Skeleton width={110} height={20} />
          <Skeleton width={110} height={20} />
          <Skeleton width={110} height={20} />
          <Skeleton width={110} height={20} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
