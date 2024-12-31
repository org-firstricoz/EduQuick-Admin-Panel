import Dialog from "@dialog";

interface props {
  filter: string;
  openFilter: boolean;
  setOpenFilter: (value: boolean) => void;
  setFilter: (value: string) => void;
}

const FilterDialog = ({
  openFilter,
  setOpenFilter,
  filter,
  setFilter,
}: props) => {
  const handleSetFilter = (filter: string) => {
    setFilter(filter);
    setOpenFilter(false);
  };

  return (
    <Dialog open={openFilter} width={500} onClose={() => null}>
      <div className="w-full h-full flex flex-col gap-4 items-center">
        <div className="flex gap-3">
          <button
            onClick={() => handleSetFilter("Verified")}
            className={`border p-2 pl-6 pr-6 rounded-full ${
              filter === "Verified" && "bg-primary border-none"
            }`}
          >
            Verified
          </button>
          <button
            onClick={() => handleSetFilter("Rejected")}
            className={`border p-2 pl-6 pr-6 rounded-full ${
              filter === "Rejected" && "bg-primary border-none"
            }`}
          >
            Rejected
          </button>
          <button
            onClick={() => handleSetFilter("Pending")}
            className={`border p-2 pl-6 pr-6 rounded-full ${
              filter === "Pending" && "bg-primary border-none"
            }`}
          >
            Pending
          </button>
        </div>
        {/* <button
          onClick={() => setOpenFilter(false)}
          className="bg-primary pl-6 pr-6 p-2 rounded-md"
        >
          Apply
        </button> */}
      </div>
    </Dialog>
  );
};

export default FilterDialog;
