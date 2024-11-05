import { topCourseData } from "@dashboard/constant/constant";

const TopCourse = () => {
  return (
    <>
      <div className="flex justify-between gap-4  pl-6 pr-6 text-secondary text-xl font-normal">
        <p>#</p>
        <p>Name</p>
        <p>Popularity</p>
        <p>Sales</p>
      </div>
      <div className="w-full h-full overflow-scroll">
        {topCourseData.map((data, i: number) => (
          <div
            className="flex border-t-2 items-center p-6 justify-between gap-4 mt-4 font-normal text-2xl"
            key={i}
          >
            <p>{data.i}</p>
            <p>{data.title}</p>
            <div className="bg-[#fff] w-56 rounded-full h-2 ">
              <div
                className="bg-[#399918] h-full w-1 rounded-full"
                style={{
                  width: `${data.popularity}%`,
                }}
              />
            </div>
            <button className="border-2 border-[#399918] bg-[#fff] text-[#399918] p-1 pl-4 pr-4 rounded-md font-medium">
              {data.sales}
            </button>
          </div>
        ))}
        {topCourseData.map((data, i: number) => (
          <div
            className="flex border-t-2 items-center p-6 justify-between gap-4 mt-4 font-normal text-2xl"
            key={i}
          >
            <p>{data.i}</p>
            <p>{data.title}</p>
            <div className="bg-[#fff] w-56 rounded-full h-2 ">
              <div
                className="bg-[#399918] h-full w-1 rounded-full"
                style={{
                  width: `${data.popularity}%`,
                }}
              />
            </div>
            <button className="border-2 border-[#399918] bg-[#fff] text-[#399918] p-1 pl-4 pr-4 rounded-md font-medium">
              {data.sales}
            </button>
          </div>
        ))}
      </div>
      <div className="relative flex h-4 underline items-center justify-center">
        <button>View More</button>
      </div>
    </>
  );
};

export default TopCourse;
