import { useState } from "react";
import Dialog from "../../../../Components/Dialog/Dialog";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

interface props {
  openTagDialog: boolean;
  setOpenTagDialog: (value: boolean) => void;
  tags: string[];
}

const AddTags = ({ openTagDialog, setOpenTagDialog, tags }: props) => {
  const [tag, setTag] = useState("");

  const validation = () => {
    if (tag === "") {
      toast.error("Please enter a tag");
      return false;
    }
    return true;
  };

  const handleAddTag = () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    tags.push(tag);
    setTag("");
    setOpenTagDialog(false);
  };

  const handleClose = () => {};
  return (
    <Dialog width={400} open={openTagDialog} onClose={handleClose}>
      <button
        onClick={() => setOpenTagDialog(false)}
        className="absolute top-4 right-4 text-2xl"
      >
        <IoMdClose />
      </button>
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag"
          className="bg-[#0000002a] p-4 text-xl rounded-md border"
        />
        <button
          onClick={handleAddTag}
          className="p-2 pl-7  pr-7 hover:bg-[#252525] rounded-lg active:bg-[#303030] transition-all duration-300"
        >
          Add Tag
        </button>
      </div>
    </Dialog>
  );
};

export default AddTags;
