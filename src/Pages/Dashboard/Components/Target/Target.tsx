import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const Target = () => {
  const data = [
    {
      name: "Jan",
      RealitySales: 15,
      TargetedSales: 13,
    },
    {
      name: "Feb",
      RealitySales: 17,
      TargetedSales: 14,
    },
    {
      name: "Mar",
      RealitySales: 10,
      TargetedSales: 12,
    },
    {
      name: "Apr",
      RealitySales: 21,
      TargetedSales: 18,
    },
    {
      name: "May",
      RealitySales: 7,
      TargetedSales: 10,
    },
    {
      name: "Jun",
      RealitySales: 4,
      TargetedSales: 5,
    },
    {
      name: "Jul",
      RealitySales: 16,
      TargetedSales: 22,
    },
  ];

  return (
    <div className="w-2/6 overflow-scroll  border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl">
      <p className="text-primary text-xl font-semibold">Target vs Reality</p>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="RealitySales" fill="#399918" barSize={20} />
        <Bar dataKey="TargetedSales" fill="#E70612" barSize={20} />
      </BarChart>
    </div>
  );
};

export default Target;
