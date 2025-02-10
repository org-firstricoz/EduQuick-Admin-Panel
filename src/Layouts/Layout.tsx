import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const Layout = ({ children }: props) => {
  return (
    <div>
      <Nav />
      <div className="flex">
        <Sidebar />

        <div className="w-4/5 flex flex-col">
          <main className="p-4 flex-1 bg-gray-100">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
