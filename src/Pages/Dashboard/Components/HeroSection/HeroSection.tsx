import Revenue from "@dashboard/Components/Revenue/Revenue";
import TodaysSales from "@dashboard/Components/TodaysSales/TodaysSales";
import TopCourse from "@dashboard/Components/TopCourse/TopCourse";
// import Visitors from "@dashboard/Components/Visitors/Visitors";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      <div className=" flex gap-4">
        <TodaysSales />
        {/* <Visitors /> */}
      </div>

      <div className=" flex gap-4">
        <Revenue />
        {/* <CustomerSatisfaction /> */}
      </div>
      <div className=" flex gap-4">
        <TopCourse />
      </div>
    </div>
  );
};

export default HeroSection;
