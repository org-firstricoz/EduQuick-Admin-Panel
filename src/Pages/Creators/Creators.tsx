import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "@creators/Components/HeroSection/HeroSection";
import { useTitle } from "@hooks";

const Creators = () => {
  useTitle("Create Course • EduQuick");
  return (
    <div>
      <Nav />
      <div className="flex">
        <Sidebar />
        <HeroSection />
      </div>
    </div>
  );
};

export default Creators;
