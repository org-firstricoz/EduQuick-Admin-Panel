import { Line, LineChart, Tooltip, XAxis } from "recharts";

const Visitors = () => {
  const data = [
    {
      name: "",
      NewVisitors: "30",
      Revisitors: "50",
      Regulars: "20",
    },
    {
      name: "Jan",
      NewVisitors: "310",
      Revisitors: "250",
      Regulars: "240",
    },
    {
      name: "Feb",
      NewVisitors: "205",
      Revisitors: "300",
      Regulars: "100",
    },
    {
      name: "Mar",
      NewVisitors: "25",
      Revisitors: "60",
      Regulars: "10",
    },
    {
      name: "Apr",
      NewVisitors: "225",
      Revisitors: "160",
      Regulars: "110",
    },
    {
      name: "May",
      NewVisitors: "325",
      Revisitors: "360",
      Regulars: "240",
    },
  ];

  return (
    <div className=" w-2/5 border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl ">
      <p className="text-primary text-xl font-semibold">Visitors Insights</p>
      <LineChart width={330} height={200} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="NewVisitors"
          stroke="#0D92F4"
          strokeWidth={4}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Revisitors"
          stroke="#EB8317"
          strokeWidth={4}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Regulars"
          stroke="#347928"
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default Visitors;
