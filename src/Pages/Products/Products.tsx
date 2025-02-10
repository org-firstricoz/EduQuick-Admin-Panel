import { useTitle } from "@hooks";
import HeroSection from "@products/Components/HeroSection/HeroSection";

const Products = () => {
  useTitle("Courses • EduQuick");
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Products;
