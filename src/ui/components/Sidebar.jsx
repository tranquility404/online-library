import { useContext } from "react";
import img from "../../assets/images/profile.png";
import { logout } from "../../scripts/api/ApiRequests";
import "../../styles/components/_sidebar.scss";
import { AuthStatusContext } from "../pages/LoginPage/AuthStatusContext";

export default function Sidebar({ isNavOpen }) {
    const { setIsAuthenticated } = useContext(AuthStatusContext);

    const logOutClicked = async () => {
        const res = await logout();
        if (res.status == 200) {
            console.log(res.data);
            setIsAuthenticated(false);
        }  
    }

    return (
        <aside className={`${isNavOpen ? "is-open" : ""}`}>
            <div className="profile">
                <div className="profile-img">
                    <img src={img} />
                </div>
                <br />
                <h4>Admin</h4>
            </div>

            <nav>
                <ul>
                    <li>
                        <i className="fas fa-book"></i> My Collection
                        <a href="#" className="sidebar-link"></a>
                    </li>
                    <li>
                        <i className="fas fa-trophy"></i> Leaderboard
                        <a href="#" className="sidebar-link"></a>
                    </li>
                    <li>
                        <i className="fas fa-history"></i> Quiz History
                        <a href="#" className="sidebar-link"></a>
                    </li>

                    <li>
                        <i className="fas fa-book-reader"></i> Request a Book
                        <a href="#" className="sidebar-link"></a>
                    </li>
                    <li>
                        <i className="fas fa-comment-alt"></i> Feedback
                        <a href="#" className="sidebar-link"></a>
                    </li>
                    <li className="logout" onClick={logOutClicked}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                        <a href="#" className="sidebar-link logout"></a>
                    </li>
                </ul>

            </nav>
        </aside>
    )
}