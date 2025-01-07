import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "@creators/Components/HeroSection/HeroSection";

const Creators = () => {
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
