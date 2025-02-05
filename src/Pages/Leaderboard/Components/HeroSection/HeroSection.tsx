import TopCourse from "@dashboard/Components/TopCourse/TopCourse";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 63px)",
      }}
    >
      <h2 className="text-center text-primary text-4xl font-bold">
        Top Courses
      </h2>
      <TopCourse />
    </div>
  );
};

export default HeroSection;
