import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "./Components/HeroSection";
import { useTitle } from "@hooks";

const Admin = () => {
  useTitle("Admins • EduQuick");
  return (
    <div>
      <Nav />
      <div className="flex pr-7">
        <Sidebar />
        <HeroSection />
      </div>
    </div>
  );
};

export default Admin;
