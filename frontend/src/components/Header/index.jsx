import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 border-b">
      <Link to="/" className="flex items-center">
        <img src="/logo.jpg" alt="logo" width={80} />
        <h2 className="text-2xl font-bold max-sm:hidden">Filmania</h2>
      </Link>
      <Link
        to="/create"
        className="px-5 py-1 transition border rounded-full hover:bg-black hover:text-white"
      >
        Create Movie
      </Link>
    </header>
  );
};

export default Header;
