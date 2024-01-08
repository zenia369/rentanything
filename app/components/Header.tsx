import { Link } from "@remix-run/react";

const Header = () => {
  return (
    <div className="flex items-center h-full p-2">
      <Link
        to="/new"
        className="py-1 px-2 border bg-green-400 rounded text-white"
      >
        Здати в оренду
      </Link>
    </div>
  );
};

export default Header;
