import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import { useTitle } from "@hooks";
import HeroSection from "@verify/Components/HeroSection/HeroSection";

const Verify = () => {
  useTitle("Verify Course • EduQuick");
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
