import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "./HeroSection";
import { useTitle } from "@hooks";

const UsersPage = () => {

  useTitle("Users • EduQuick");

  return (
    <div>
      <Nav />
      <div className="flex  ">
        <Sidebar />
        <HeroSection />
      </div>
    </div>
  );
};

export default UsersPage;
