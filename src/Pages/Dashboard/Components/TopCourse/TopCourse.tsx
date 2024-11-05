import { topCourseData } from "@dashboard/constant/constant";

const TopCourse = () => {
  return (
    <div className="w-1/2 overflow-scroll  border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl">
      <p className="text-primary text-xl font-semibold">Top Courses</p>
      <div className="flex justify-between gap-4 mt-4 text-secondary text-sm font-normal">
        <p>#</p>
        <p>Name</p>
        <p>Popularity</p>
        <p>Sales</p>
      </div>
      {topCourseData.map((data, i: number) => (
        <div
          className="flex justify-between gap-4 mt-4 font-normal text-base"
          key={i}
        >
          <p>{data.i}</p>
          <p>{data.title}</p>
          <div className="bg-[#fff] w-24 rounded-full h-1 ">
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
  );
};

export default TopCourse;
