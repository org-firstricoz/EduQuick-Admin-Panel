import { mailsData } from "@messages/constant/constant";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Email = () => {
  return (
    <div className="w-full flex text-center text-secondary flex-col">
      <table className="w-full">
        {mailsData.map((data, i: number) => (
          <tr key={i} className="border-b  h-20">
            <td>
              <input type="checkbox" className="size-5" />
            </td>
            <td>
              {data.starred ? (
                <FaStar className="text-2xl" />
              ) : (
                <CiStar className="text-3xl" />
              )}
            </td>
            <td>
              <p className="text-base font-bold">{data.name}</p>
            </td>
            <td>
              <button className="p-2 w-40 bg-[#00b69b4d] text-[#00B69B] rounded-sm">
                {data.name}
              </button>
            </td>
            <td>
              <p className="font-bold text-base">
                {data.msg.length > 20
                  ? data.msg.slice(0, 20) + "..."
                  : data.msg}
              </p>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Email;
