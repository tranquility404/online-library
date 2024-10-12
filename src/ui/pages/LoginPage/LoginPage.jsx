import { useState } from "react";
import "../../../styles/pages/login-page/login-page.scss";
import { useAuthHelper } from "../../../scripts/controllers/LoginControl";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { isAuthenticated, initiateLogin, initiateRegistration } = useAuthHelper();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isActive, setIsActive] = useState(false);

    const validateLogin = (event) => {
        event.preventDefault();
        setError('');

        if (email === '') {
            setError('Enter Email');
            return;
        } else if (password === '') {
            setError('Enter Password');
            return;
        } else if (isActive && name == "") {
            setError('Name is required');
            return;
        }

        if (email.length > 4 && password.length > 4) {
            // console.log("login");
            if (isActive)
                initiateRegistration(name, email, password, navigate);
            else
                initiateLogin(email, password, navigate)
            return;
        } else {
            setError('Inavalid Email or Password');
            return;
        }
    };

    return (
        <div className="login-page">
            <div className={`login-page-container ${isActive ? "active" : ""}`}>
                <div className="form-container sign-up">
                    <form onSubmit={validateLogin}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registeration</span>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value.trim())} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value.trim())} />
                        <input type="password" placeholder="Password" autoComplete={{ suggested: "current-password" }} onChange={(e) => setPassword(e.target.value.trim())} />
                        <button className="btn btn--primary">Sign Up</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={validateLogin}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email password</span>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value.trim())} />
                        <input type="password" placeholder="Password" autoComplete={{ suggested: "current-password" }} onChange={(e) => setPassword(e.target.value.trim())} />
                        <a href="#">Forget Your Password?</a>
                        <button className="btn btn--primary">Sign In</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden btn btn--secondary2" id="login" onClick={() => setIsActive(prev => !prev)}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden btn btn--secondary2" id="register" onClick={() => setIsActive(prev => !prev)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}