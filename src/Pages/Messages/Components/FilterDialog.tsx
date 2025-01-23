import Dialog from "@dialog";
import { IoClose } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const FilterDialog = ({ open, setOpen }: props) => {
  const [query, setQuery] = useSearchParams();

  const filter = query.get("filter");

  const handleFilterChange = (filter: string) => {
    setQuery({ filter: filter });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => null} width={400}>
      <div className="w-full flex justify-center items-center flex-col gap-4">
        <IoClose
          onClick={() => setOpen(false)}
          className="absolute right-5 top-4 cursor-pointer text-2xl"
        />
        <h2 className="font-medium text-2xl">Complaints</h2>
        <div className="flex justify-center gap-4">
          <button
            className={`p-2 pl-6 pr-6 rounded-full ${
              filter === "Pending" ? "bg-primary" : "border"
            }`}
            onClick={() => handleFilterChange("Pending")}
          >
            Pending
          </button>
          <button
            className={`p-2 pl-6 pr-6 rounded-full ${
              filter === "Resolved" ? "bg-primary" : "border"
            }`}
            onClick={() => handleFilterChange("Resolved")}
          >
            Resolved
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default FilterDialog;
