import { productData } from "@products/constant/constant";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <h2 className="text-primary text-center text-4xl font-semibold">
        Courses
      </h2>
      <div className="w-full h-full overflow-scroll p-4 border-2 rounded-md">
        <table className="w-full  text-center">
          <tr className=" text-secondary h-16 text-xl font-medium">
            <td>#</td>
            <td>Product Name</td>

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
                <div className="flex bg-[#fff]  mr-2 rounded-full">
                  <FiEdit className="border-r cursor-pointer hover:bg-[#f0f0f0] rounded-l-full w-1/2 p-2 text-[#000] text-4xl" />
                  <FaTrash className="border-r cursor-pointer hover:bg-[#f0f0f0] rounded-r-full w-1/2 p-2 text-primary text-4xl" />
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default HeroSection;
