import { useTitle } from "@hooks";
import HeroSection from "./Components/HeroSection";

const Admin = () => {
  useTitle("Admins • EduQuick");
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Admin;
