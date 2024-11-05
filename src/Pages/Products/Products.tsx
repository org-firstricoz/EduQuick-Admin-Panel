import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "@products/Components/HeroSection/HeroSection";

const Products = () => {
  return (
    <div>
      <Nav />
      <div className="flex pl-7 pr-7">
        <Sidebar />
        <HeroSection />
      </div>
    </div>
  );
};

export default Products;
