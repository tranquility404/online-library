import { useContext } from "react";
import img from "../../../assets/images/hero-img.png";
import { AuthContext } from "./AuthContext";

export default function RegistrationPage() {
    const {validateLogin, setName, setEmail, setPassword, setIsLogin, error} = useContext(AuthContext);
    
    return (
        <div className="form-container sign-up">
                <div className="toggle-panel toggle-left">
                    <h2>Discover, Learn, and Grow at Wisdom's Retreat</h2>
                    <p className="toggle-panel-content">
                        Read books, engage with quizzes, and receive AI insights for a richer learning experience!
                    </p>
                    <img src={img} alt="" />
                </div>

                <div className="sign-up-form">
                    <p className="title-2">
                        Welcome to
                        <strong> Wisdom's Retreat</strong>
                    </p>
                    <form onSubmit={validateLogin}>
                        <h2>Create a new account</h2>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value.trim())} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value.trim())} />
                        <input type="password" placeholder="Password" autoComplete={{ suggested: "current-password" }} onChange={(e) => setPassword(e.target.value.trim())} />
                        <button className="btn btn--primary">Register</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <p>Already have an account?&nbsp;
                        <a className="link" onClick={() => setIsLogin(prev => !prev)}>Login</a>
                    </p>
                </div>
            </div>
    )
}