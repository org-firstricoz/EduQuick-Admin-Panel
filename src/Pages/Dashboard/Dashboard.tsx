import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import { lazy } from "react";

const HeroSection = lazy(
  () => import("@dashboard/Components/HeroSection/HeroSection")
);

const Dashboard = () => {
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

export default Dashboard;
