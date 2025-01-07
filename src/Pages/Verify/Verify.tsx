import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "@verify/Components/HeroSection/HeroSection";

const Verify = () => {
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

export default Verify;
