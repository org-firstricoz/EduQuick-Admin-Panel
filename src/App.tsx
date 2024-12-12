// import Router from "@router";
import { lazy, Suspense } from "react";
import "./App.css";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

const Router = lazy(() => import("./Router/Router"));

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <div className="hidden md:block">
          <Router />
        </div>
      </Suspense>

      <div className="w-screen font-poppins  h-screen  flex md:hidden flex-col gap-2 justify-center items-center">
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
