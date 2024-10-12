import img from "../../assets/images/profile.png"
import { Link } from "react-router-dom";
import { AuthContext } from "../pages/LoginPage/AuthContext";
import { useContext } from "react";
import { logout } from "../../scripts/api/ApiRequests";

export default function Sidebar({ isNavOpen }) {
    const { setIsAuthenticated } = useContext(AuthContext);

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
                        <i class="fas fa-book"></i> My Collection
                        <a href="#" class="sidebar-link"></a>
                    </li>
                    <li>
                        <i class="fas fa-trophy"></i> Leaderboard
                        <a href="#" class="sidebar-link"></a>
                    </li>
                    <li>
                        <i class="fas fa-history"></i> Quiz History
                        <a href="#" class="sidebar-link"></a>
                    </li>

                    <li>
                        <i class="fas fa-book-reader"></i> Request a Book
                        <a href="#" class="sidebar-link"></a>
                    </li>
                    <li>
                        <i class="fas fa-comment-alt"></i> Feedback
                        <a href="#" class="sidebar-link"></a>
                    </li>
                    <li className="logout" onClick={logOutClicked}>
                        <i class="fas fa-sign-out-alt"></i> Logout
                        <a href="#" class="sidebar-link logout"></a>
                    </li>
                </ul>

            </nav>
        </aside>
    )
}