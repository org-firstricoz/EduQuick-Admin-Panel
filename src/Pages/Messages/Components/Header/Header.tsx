import SupportCard from "../../../Admin/Components/Cards/SupportCard";
import { IoChatboxSharp } from "react-icons/io5";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFillExclamation } from "react-icons/bs";
import { BsPersonFillSlash } from "react-icons/bs";

const Header = () => {
  return (
    <div className="flex w-full justify-center gap-8">
      <SupportCard
        icon={<IoChatboxSharp />}
        text="Total Complaints"
        count={3}
        onClick={() => null}
        width={4}
      />
      <SupportCard
        icon={<BsPersonFillCheck />}
        text="Total solved"
        count={3}
        onClick={() => null}
        width={4}
      />

      <SupportCard
        icon={<BsPersonFillExclamation />}
        text="Total unsolved"
        count={3}
        onClick={() => null}
        width={4}
      />
      <SupportCard
        icon={<BsPersonFillSlash />}
        text="Total pending"
        count={3}
        onClick={() => null}
        width={4}
      />
    </div>
  );
};

export default Header;
