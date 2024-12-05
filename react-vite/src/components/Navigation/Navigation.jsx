import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { FaUsers, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setFilteredCruz } from "../../redux/cruzSlice"; // Import the action to filter locally
import OnewheelIcon from "./OneWheelIcon";

const images = [
  "https://www.longboarderlabs.com/wp-content/uploads/2023/10/onewheel-gt-s-series-flip-3.jpg",
  "https://www.longboarderlabs.com/wp-content/uploads/2023/10/onewheel-gt-s-series-flip-2.jpg",
  "https://www.shutterstock.com/image-photo/fort-collins-co-usa-september-260nw-1492752197.jpg",
  "https://www.longboarderlabs.com/wp-content/uploads/2024/07/RALLY-ONEWHEEL-GT-KITSILANO-BEACH-500x500.jpg",
];

function Navigation() {
  const user = useSelector((store) => store.session.user);
  const cruzList = useSelector((state) => state.cruz.cruzList); // Access all Cruz from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stateSearchTerm, setStateSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter Cruz locally based on state
    const filteredCruz = cruzList.filter((cruz) =>
      cruz.state.toLowerCase().includes(stateSearchTerm.toLowerCase())
    );

    // Update the filtered list in Redux
    dispatch(setFilteredCruz(filteredCruz));
  };

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
              <OnewheelIcon />
              <span className="tooltip-text">Home</span>
            </NavLink>
          </li>

          {user && (
            <li className="icon-container">
              <button onClick={() => navigate("/favorites")}>
                <FaBookmark />
              </button>
              <span className="tooltip-text">Favorites</span>
            </li>
          )}

          {user && (
            <li className="icon-container">
              <button title="Feature coming soon" onClick={() => navigate("")}>
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
            It&apos;s a great day to Cruz{user ? `, ${user.first_name}` : ""}
          </h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by State"
              className="search-bar"
              value={stateSearchTerm}
              onChange={(e) => setStateSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setStateSearchTerm(""); // Reset search term
                dispatch(setFilteredCruz(cruzList)); // Reset to all Cruz
              }}
            >
              Clear
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;