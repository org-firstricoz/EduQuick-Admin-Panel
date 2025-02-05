import Skeleton from "react-loading-skeleton";

const UsersPageLoader = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 63px)",
        minHeight: "calc(100vh - 63px)",
      }}
    >
      <div className="flex  justify-between">
        <Skeleton width={120} height={40} />
        <Skeleton width={120} height={40} />
      </div>

      {/* Users table */}
      <div className="flex flex-col h-full  bg-secondary dark:bg-[#fff] dark:border p-4 rounded-md shadow-[#000] shadow-md justify-start">
        <Skeleton width={120} height={40} className="ml-[900px]" />
        <div className="flex flex-col">
          <div className="flex justify-between mt-4 gap-4">
            <Skeleton width={15} height={15} />
            <Skeleton width={120} height={15} />
            <Skeleton width={140} height={15} />
            <Skeleton width={150} height={15} />
            <Skeleton width={100} height={15} />
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <Skeleton width={15} height={15} />
            <Skeleton width={140} height={15} />
            <Skeleton width={250} height={15} />
            <Skeleton width={200} height={15} />
            <Skeleton width={120} height={15} />
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <Skeleton width={15} height={15} />
            <Skeleton width={140} height={15} />
            <Skeleton width={250} height={15} />
            <Skeleton width={200} height={15} />
            <Skeleton width={120} height={15} />
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <Skeleton width={15} height={15} />
            <Skeleton width={140} height={15} />
            <Skeleton width={250} height={15} />
            <Skeleton width={200} height={15} />
            <Skeleton width={120} height={15} />
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <Skeleton width={15} height={15} />
            <Skeleton width={140} height={15} />
            <Skeleton width={250} height={15} />
            <Skeleton width={200} height={15} />
            <Skeleton width={120} height={15} />
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <Skeleton width={15} height={15} />
            <Skeleton width={140} height={15} />
            <Skeleton width={250} height={15} />
            <Skeleton width={200} height={15} />
            <Skeleton width={120} height={15} />
          </div>
          <div className="flex justify-between mt-4 gap-4">
            <Skeleton width={15} height={15} />
            <Skeleton width={140} height={15} />
            <Skeleton width={250} height={15} />
            <Skeleton width={200} height={15} />
            <Skeleton width={120} height={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPageLoader;
