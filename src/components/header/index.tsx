import { FaSearch, FaHome, FaChartBar, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export function Header() {
  return (
    <nav className="bg-neutral-800 p-5">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to='/'>
            <img
              src={logo}
              alt="Logo da Empresa"
              className="w-20 h-auto mr-4"
            />
          </Link>
          <div className="hidden md:flex items-center text-white">
            <input
              type="text"
              placeholder="Tropa da ZC..."
              className="px-3 py-1 bg-[#494949] rounded-lg text-white outline-none text-lg"
              style={{ minWidth: "200px" }}
            />
            <button className="ml-2 px-4 py-1 text-lg">
              <FaSearch className="text-white" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-6 pl-4 md:pl-20">
          <Link to="/" className="text-white px-4 py-1 text-lg">
            <FaHome className="inline-block mr-2" />
            Home
          </Link>
          <Link to="/cadastro" className="text-white px-4 py-1 text-lg">
            <FaChartBar className="inline-block mr-2" />
            Registro
          </Link>
          <a href="https://discord.gg/MXeEGYCB4X" className="text-white px-4 py-1 text-lg">
            <FaDiscord className="inline-block mr-2" />
            Discord
          </a>
        </div>
        <div className="flex-grow"></div>
      </div>
    </nav>
  );
}
