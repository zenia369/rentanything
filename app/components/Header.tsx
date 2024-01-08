import { Link } from "@remix-run/react";
import { IoCreate } from "react-icons/io5";

const Header = () => {
  return (
    <div className="flex items-center h-full p-2">
      <Link
        to="/new"
        className="text-base py-1 px-2 border bg-green-400 rounded text-white flex gap-1 items-center"
      >
        <IoCreate /> Здати в оренду
      </Link>
    </div>
  );
};

export default Header;
