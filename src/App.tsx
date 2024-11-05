import Router from "@router";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="hidden md:block">
        <Router />
      </div>

      <div className="w-screen font-poppins  flex md:hidden flex-col gap-2 justify-center items-center">
        <h2 className="font-jacques  text-primary" style={{ fontSize: 220 }}>
          404
        </h2>
        <p className="font-normal text-4xl">
          <span className="font-bold">Oops</span>, you’ve lost
        </p>
        <p className="font-light">
          We can’t find the page that you’re looking for...
        </p>
      </div>
    </>
  );
};

export default App;
