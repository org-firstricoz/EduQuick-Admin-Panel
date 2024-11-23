import { topCourseData } from "@dashboard/constant/constant";

const TopCourse = () => {
  return (
    <div className="w-full overflow-scroll  border rounded-xl shadow-[#0a0a0a] shadow-xl">
      <p className="text-primary text-xl font-semibold m-4">Top Courses</p>

      <table style={{ width: "95%" }} className="m-6">
        <tr className="text-secondary mt-4 text-sm font-normal">
          <td>#</td>
          <td>Name</td>
          <td>Popularity</td>
        </tr>
        {topCourseData.map((data, i: number) => (
          <tr key={i} className="border-t border-b">
            <td>{data.i}</td>
            <td>{data.title}</td>
            <td>
              <div className="w-full mt-4 mb-4 rounded-full bg-[#fff] h-1">
                <div
                  className={`bg-[#399918] h-full rounded-full`}
                  style={{
                    width: `${data.popularity}%`,
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TopCourse;
