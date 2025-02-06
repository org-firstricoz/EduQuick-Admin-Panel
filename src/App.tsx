// import Router from "@router";
import { lazy, Suspense } from "react";
import "./App.css";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

const Router = lazy(() => import("./Router/Router"));

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <div className="hidden md:block bg-[#111] w-screen h-screen dark:bg-[#fff] text-[#fff] dark:text-[#111]">
          <Router />
        </div>
      </Suspense>

      <div className="w-screen font-poppins dark:bg-[#fff] bg-[#111]  h-screen  flex md:hidden flex-col gap-2 justify-center items-center">
        <p className="font-normal text-4xl">
          <span className="font-bold">Oops</span>, you’ve lost
        </p>
        <p className="font-light">
          This page available for only desktop users...
        </p>
      </div>
    </>
  );
};

export default App;
