// import { useState } from "react";

import { useContext } from "react";
import img from "../../assets/images/profile.png";
import { AuthContext } from "../pages/LoginPage/AuthContext.jsx";

export default function Header({isNavOpen, setNavOpen}) {
    // const [isNavOpen, setNavOpen] = useState(false);
    const { setIsAuthenticated } = useContext(AuthContext);
    const toggleNav = () => {
        setNavOpen(!isNavOpen)
    };

    return (
        <header>

                <div className="hamburger" onClick={toggleNav}>
                    <i className="fa-solid fa-bars fa-2x" />
                </div>

                <h2 className="app-name">Wisdom's Retreat</h2>

                <div className="profile-img">
                    <img src={img} alt="Profile" />
                </div>
                {/* <button className="logout-btn btn btn--rounded btn--primary"
                        onClick={logOutClicked}>
                    LOG OUT
                </button> */}
            </header>
    )
} 