import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const Revenue = () => {
  const data = [
    {
      name: "Jan",
      CourseSeles: 15,
      SubscriptionSeles: 13,
    },
    {
      name: "Feb",
      CourseSeles: 17,
      SubscriptionSeles: 14,
    },
    {
      name: "Mar",
      CourseSeles: 10,
      SubscriptionSeles: 12,
    },
    {
      name: "Apr",
      CourseSeles: 21,
      SubscriptionSeles: 18,
    },
    {
      name: "May",
      CourseSeles: 7,
      SubscriptionSeles: 10,
    },
    {
      name: "Jun",
      CourseSeles: 4,
      SubscriptionSeles: 5,
    },
    {
      name: "Jul",
      CourseSeles: 16,
      SubscriptionSeles: 22,
    },
  ];

  return (
    <div className="w-2/6 overflow-scroll  border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl">
      <p className="text-primary text-xl font-semibold">Target vs Reality</p>
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="CourseSeles" fill="#399918" barSize={20} />
        <Bar dataKey="SubscriptionSeles" fill="#E70612" barSize={20} />
      </BarChart>
    </div>
  );
};

export default Revenue;
