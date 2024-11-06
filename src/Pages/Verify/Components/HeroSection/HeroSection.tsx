import { productData } from "@products/constant/constant";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <h2 className="text-primary flex items-center gap-2 justify-center text-center text-4xl font-semibold">
        Verification{" "}
        <span className="border w-6 h-6 flex items-center font-normal justify-center rounded-full text-sm">
          ?
        </span>
      </h2>
      <div className="w-full h-full overflow-scroll p-4 border-2 rounded-md">
        <table className="w-full  text-center">
          <tr className=" text-secondary h-16 text-xl font-medium">
            <td>#</td>
            <td>Product Name</td>
            <td>Date</td>
            <td>Verification</td>
            <td>Action</td>
          </tr>

          {productData.map((data, i: number) => (
            <tr key={i} className="font-medium text-xl bg-[#000] ">
              <td>
                <img src={data.img} className="w-24 h-20" alt="" />
              </td>
              <td>
                <div className="flex  flex-col">
                  <h2>{data.title}</h2>
                  <p className="text-sm">{data.rating}</p>
                </div>
              </td>
              <td>
                <h2>${data.date}</h2>
              </td>
              <td>{data.verification ? "Verified" : "Pending"}</td>
              <td>
                <button className="p-2 pl-4 pr-4 rounded-lg bg-primary">
                  Edit Product
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default HeroSection;
