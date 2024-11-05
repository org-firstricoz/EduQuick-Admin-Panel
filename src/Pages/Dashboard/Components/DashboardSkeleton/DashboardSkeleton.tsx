import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <>
      <SkeletonTheme baseColor="#111111" highlightColor="#1c1c1c">
        <div
          className=" w-full overflow-hidden pl-4 pr-4 p-2 flex flex-col gap-4 "
          style={{
            height: "calc(100vh - 100px)",
          }}
        >
          <div className=" flex gap-4">
            <Skeleton width={600} height={250} />
            <Skeleton width={400} height={250} />
          </div>
          <div className=" flex gap-4">
            <Skeleton width={333} height={350} />
            <Skeleton width={333} height={350} />
            <Skeleton width={333} height={350} />
          </div>
        </div>
      </SkeletonTheme>
    </>
  );
};

export default DashboardSkeleton;
