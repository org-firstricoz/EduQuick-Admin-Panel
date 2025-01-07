interface props {
  adminsCount: number;
}

const TotalAdmin = ({ adminsCount }: props) => {
  return (
    <div className="w-1/3 h-[200px] shadow-[#000] shadow-md rounded-md bg-secondary flex flex-col gap-2 justify-center items-center">
      <h2 className="text-2xl font-semibold">Total Admins</h2>
      <button className="p-2 pl-6 pr-6 bg-primary text-[#fff] rounded-md shadow-[#000] shadow-md">
        {adminsCount} members
      </button>
    </div>
  );
};

export default TotalAdmin;
