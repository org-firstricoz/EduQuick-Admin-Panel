import { useTitle } from "@hooks";
import Email from "@messages/Components/Email/Email";

const Emails = () => {
  useTitle("Support • EduQuick");
  return (
    <div className="bg-secondary shadow-[#000] shadow-md w-full overflow-scroll rounded-md ">
      <Email />
    </div>
  );
};

export default Emails;
