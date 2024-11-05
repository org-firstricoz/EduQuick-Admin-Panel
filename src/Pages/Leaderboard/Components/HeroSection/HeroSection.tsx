import TopCourse from "@leaderboard/Components/TopCourse/TopCourse";

const HeroSection = () => {
  return (
    <div
      className=" w-full border-2 pl-8 pr-8 p-2 ml-4 mr-4 rounded-xl flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
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
