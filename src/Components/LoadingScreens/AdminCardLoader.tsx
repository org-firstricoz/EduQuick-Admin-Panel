import Skeleton from "react-loading-skeleton";

const AdminCardLoader = () => {
  return (
    <div className="bg-secondary dark:bg-[#fff] dark:text-[#111] shadow-[#000] dark:shadow-sm dark:border shadow-md transition-all hover:bg-[#1d1d1d] duration-300 flex flex-col gap-1 p-3 rounded-md w-full">
      <div className="flex gap-2">
        <Skeleton
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
          }}
        />
        <div>
          <Skeleton width={100} height={20} />
          <Skeleton width={100} height={10} />
        </div>
      </div>
      <hr className="w-[200px] border-[#696969]" />
      <Skeleton width={100} height={15} />
      <Skeleton width={300} height={15} />
      <Skeleton width={150} height={15} />
    </div>
  );
};

export default AdminCardLoader;
