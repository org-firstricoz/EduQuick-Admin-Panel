import { creatorsData } from "@creators/constant/constant";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <h2 className="text-primary text-center text-4xl font-semibold">
        Creators
      </h2>
      <div
        className="border-2 p-2 rounded-md overflow-scroll"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        <div className="flex justify-between gap-4 p-4  pl-6 pr-6 text-secondary text-xl font-normal">
          <p>#</p>
          <p>Name</p>
          <p>Followers</p>
          <p>Date</p>
        </div>
        {creatorsData.map((data, i: number) => (
          <div
            className="flex border-t-2 items-center gap-1 p-3 justify-between  font-normal text-2xl"
            key={i}
          >
            <p>{data.i}</p>
            <div className="flex items-center justify-center gap-4">
              <img src={data.avata} alt="Pic" className="w-14 rounded-full" />
              <p>{data.name}</p>
            </div>
            <p>{data.followers}</p>
            <p>{data.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
