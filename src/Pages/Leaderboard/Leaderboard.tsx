import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "./Components/HeroSection/HeroSection";

const Leaderboard = () => {
  return (
    <div>
      <Nav />
      <div className="flex ">
        <Sidebar />
        <HeroSection />
      </div>
    </div>
  );
};

export default Leaderboard;
