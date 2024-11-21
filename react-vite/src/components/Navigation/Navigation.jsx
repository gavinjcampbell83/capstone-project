import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { FaUsers, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OnewheelIcon from "./OneWheelIcon";

const images = [
  "https://www.longboarderlabs.com/wp-content/uploads/2023/10/onewheel-gt-s-series-flip-3.jpg",
  "https://www.longboarderlabs.com/wp-content/uploads/2023/10/onewheel-gt-s-series-flip-2.jpg",
  "https://www.shutterstock.com/image-photo/fort-collins-co-usa-september-260nw-1492752197.jpg",
  "https://www.longboarderlabs.com/wp-content/uploads/2024/07/RALLY-ONEWHEEL-GT-KITSILANO-BEACH-500x500.jpg",
];

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <nav className="navigation-bar">
      <div
        className="scrolling-banner"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <ul className="nav-bar-elements">
        <li className="logo-container">
          <NavLink className="icon-container" to="/">
            {/* <span className="logo-text">Cruz</span> */}
            <OnewheelIcon/>
            <span className="tooltip-text">Home</span>
          </NavLink>
        </li>

        {user && (
          <li className="icon-container">
            <button onClick={() => navigate("")}>
              <FaBookmark />
            </button>
            <span className="tooltip-text">Favorites</span>
          </li>
        )}

        {user && (
          <li className="icon-container">
            <button onClick={() => navigate("")}>
              <FaUsers />
            </button>
            <span className="tooltip-text">Community</span>
          </li>
        )}

        <li className="icon-container">
          <ProfileButton />
          <span className="tooltip-text">Profile</span>
        </li>
      </ul>

      <div className="search-container">
        <h1 className="welcome-text">
          It&apos;s a great day to Cruz{user ? `, ${user.username}` : ""}
        </h1>
        <input type="text" placeholder="Find a cruz near you..." className="search-bar" />
      </div>
    </nav>
    </div>
  );
}

export default Navigation;