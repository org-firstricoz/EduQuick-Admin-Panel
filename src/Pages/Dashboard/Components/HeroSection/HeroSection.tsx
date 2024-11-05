import TodaysSales from "@dashboard/Components/TodaysSales/TodaysSales";
import Visitors from "@dashboard/Components/Visitors/Visitors";
import Revenue from "@dashboard/Components/Revenue/Revenue";
import CustomerSatisfaction from "@dashboard/Components/Customer Satisfaction/CustomerSatisfaction";
import Target from "@dashboard/Components/Target/Target";
import TopCourse from "@dashboard/Components/TopCourse/TopCourse";

const HeroSection = () => {
  return (
    <div
      className=" w-full  overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <div className=" flex gap-4">
        <TodaysSales />
        <Visitors />
      </div>

      <div className=" flex gap-4">
        <Revenue />
        <CustomerSatisfaction />
        <Target />
      </div>
      <div className=" flex gap-4">
        <TopCourse />
        <CustomerSatisfaction />
        <Target />
      </div>
    </div>
  );
};

export default HeroSection;
