import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const Revenue = () => {
  const data = [
    {
      name: "Jan",
      SubscriptionSeles: 13,
    },
    {
      name: "Feb",
      SubscriptionSeles: 14,
    },
    {
      name: "Mar",
      SubscriptionSeles: 12,
    },
    {
      name: "Apr",
      SubscriptionSeles: 18,
    },
    {
      name: "May",
      SubscriptionSeles: 10,
    },
    {
      name: "Jun",
      SubscriptionSeles: 5,
    },
    {
      name: "Jul",
      SubscriptionSeles: 22,
    },
  ];

  return (
    <div className="w-3/5 overflow-scroll  border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl">
      <p className="text-primary text-xl font-semibold">Total Revenue</p>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="SubscriptionSeles" fill="#E70612" barSize={20} />
      </BarChart>
    </div>
  );
};

export default Revenue;
