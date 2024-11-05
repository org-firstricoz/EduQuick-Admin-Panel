import { Line, LineChart, Tooltip } from "recharts";

const CustomerSatisfaction = () => {
  const data = [
    {
      LastMonth: "4",
      ThisMonth: "1",
    },
    {
      LastMonth: "5",
      ThisMonth: "2",
    },
    {
      LastMonth: "4",
      ThisMonth: "3",
    },
    {
      LastMonth: "6",
      ThisMonth: "1",
    },
  ];
  return (
    <div className="w-2/6 overflow-scroll  border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl">
      <p className="text-primary text-xl font-semibold">
        Customer Satisfaction
      </p>
      <LineChart
        width={250}
        height={200}
        data={data}
        className=" flex justify-center  absolute top-10 items-center"
      >
        <Tooltip />
        <Line
          type="monotone"
          dataKey="LastMonth"
          stroke="#FFC633"
          strokeWidth={4}
          //   dot={false}
        />
        <Line
          type="monotone"
          dataKey="ThisMonth"
          stroke="#399918"
          strokeWidth={4}
          //   dot={false}
        />
      </LineChart>
    </div>
  );
};

export default CustomerSatisfaction;
