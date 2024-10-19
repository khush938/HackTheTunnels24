import { Link } from "react-router-dom";
import "./HeaderLinks.style.scss";
import { useAccountContext } from "@/context";

function HeaderLinks() {
  const { logout } = useAccountContext();

  return (
    <div className="HeaderLinks">
      <Link to={"/"}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/93/93634.png"
          alt="Return to Menu"
          className="icon"
        />
        Return To Menu
      </Link>
      |
      <Link to={"/sitemap"}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1239/1239525.png"
          alt="Site Map"
          className="icon"
        />
        Site Map
      </Link>
      |
      <Link to={"/help"}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1865/1865269.png"
          alt="Help"
          className="icon"
        />
        Help
      </Link>
      |
      <Link to={"/login"}>
        <span onClick={() => logout()}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
            alt="Logout"
            className="icon"
          />
          Logout
        </span>
      </Link>
    </div>
  );
}

export default HeaderLinks;
