import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import { useTitle } from "@hooks";
import HeroSection from "@products/Components/HeroSection/HeroSection";

const Products = () => {
  useTitle("Courses • EduQuick");
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

export default Products;
