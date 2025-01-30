import axios from "axios";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { baseURL } from "../../../../baseURL";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface RevenueData {
  date: string;
  day: string;
  revenue: number;
}

const Revenue = () => {
  const [revenue, setRevenue] = useState([]);

  const token = Cookies.get("token");

  const getTotalRevenue = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/dashboard/total-revenue`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedRevenue = response.data.weeklyRevenue.map(
        (item: RevenueData) => ({
          ...item,
          revenue: item.revenue / 100,
        })
      );

      setRevenue((prevRevenue) => {
        if (JSON.stringify(prevRevenue) !== JSON.stringify(formattedRevenue)) {
          return formattedRevenue;
        }
        return prevRevenue;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalRevenue();
  }, []);

  return (
    <div className="w-full overflow-scroll bg-secondary dark:bg-[#fff] p-4 rounded-xl dark:shadow-sm dark:border shadow-[#0a0a0a] shadow-xl">
      <p className="text-primary text-xl font-semibold">Total Revenue</p>
      <BarChart width={1000} height={300} data={revenue}>
        <XAxis dataKey="day" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#E70612" barSize={20} />
      </BarChart>
    </div>
  );
};

export default Revenue;
