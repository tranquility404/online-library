import { useContext } from "react";
import img from "../../../assets/images/hero-img.png";
import { AuthContext } from "./AuthContext";

export default function LoginPage() {
    const {validateLogin, setEmail, setPassword, setIsLogin, error} = useContext(AuthContext);

    return (
        <div className="form-container sign-in">
                <div className="sign-in-form">
                    <p className="title-2">
                        Welcome to
                        <strong> Wisdom's Retreat</strong>
                    </p>
                    <form onSubmit={validateLogin}>
                        <h2>Login to your account</h2>
                        <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value.trim())} />
                        <input type="password" placeholder="Password" autoComplete={{ suggested: "current-password" }} onChange={(e) => setPassword(e.target.value.trim())} />
                        <div className="forgot-pass">
                            <p className="link">Forgot Password?</p>
                        </div>
                        <button className="btn btn--primary">Login</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <p>Don't have an account?&nbsp;
                        <a className="link" onClick={() => setIsLogin(prev => !prev)}>Register</a>
                    </p>
                </div>

                <div className="toggle-panel toggle-right">
                    <h2>Discover, Learn, and Grow at Wisdom's Retreat</h2>
                    <p className="toggle-panel-content">
                        Read books, engage with quizzes, and receive AI insights for a richer learning experience!
                    </p>
                    <img src={img} alt="" />
                </div>
            </div>
    )
}