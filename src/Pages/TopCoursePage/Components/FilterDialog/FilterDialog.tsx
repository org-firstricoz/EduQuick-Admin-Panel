import Dialog from "../../../../Components/Dialog/Dialog";

interface props {
  openFilter: boolean;
  setOpenFilter: (value: boolean) => void;
}

const FilterDialog = ({ openFilter, setOpenFilter }: props) => {
  const handleApplyFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Dialog open={openFilter} width={500} onClose={() => null}>
      <div className="w-full flex  items-center justify-center">
        <div className="w-1/2 border-r flex flex-col items-start gap-2 justify-center">
          <p>Trending</p>
          <select
            className="bg-[#111111] rounded-md outline-none border w-32 text-center p-2"
            // value={trending ? "true" : "false"}
            // onChange={(e) => setTrending(e.target.value === "true")}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <p className="mt-8">Category</p>
          <select
            className="bg-[#111111] rounded-md outline-none border w-fit text-center p-2"
            // value={trending ? "true" : "false"}
            // onChange={(e) => setTrending(e.target.value === "true")}
          >
            <option value="">Select</option>
            <option value="Mobile Tricks">Mobile Tricks</option>
            <option value="Share Market">Share Market</option>
            <option value="YouTube">YouTube</option>
            <option value="Part Time">Part Time</option>
            <option value="Astrology">Astrology</option>
            <option value="Sarkari Kaam">Sarkari Kaam</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div className="w-1/2 flex flex-col items-end gap-2 justify-center ">
          <p>Free Course</p>
          <select
            className="bg-[#111111] rounded-md outline-none border w-32 text-center p-2"
            // value={trending ? "true" : "false"}
            // onChange={(e) => setTrending(e.target.value === "true")}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <p className="mt-8">Creator</p>
          <select
            className="bg-[#111111] rounded-md outline-none border w-fit text-center p-2"
            // value={trending ? "true" : "false"}
            // onChange={(e) => setTrending(e.target.value === "true")}
          >
            <option value="">Select</option>
            <option value="Mobile Tricks">Mobile Tricks</option>
            <option value="Share Market">Share Market</option>
            <option value="YouTube">YouTube</option>
            <option value="Part Time">Part Time</option>
            <option value="Astrology">Astrology</option>
            <option value="Sarkari Kaam">Sarkari Kaam</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>
      <div className="w-full  p-2  flex mt-8 items-center justify-center">
        <button
          onClick={handleApplyFilter}
          className="bg-primary p-2 pl-6 pr-6 rounded-md"
        >
          Apply
        </button>
      </div>
    </Dialog>
  );
};

export default FilterDialog;
