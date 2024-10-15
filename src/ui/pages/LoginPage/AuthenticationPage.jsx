import React, { useContext } from "react";
import "../../../styles/pages/login-page/login-page.scss";
import { AuthContext } from "./AuthContext";
const LoginPage = React.lazy(() => import("./LoginPage"));
const RegistrationPage = React.lazy(() => import("./RegistrationPage"));

export default function AuthenticationPage() {
    const { isLogin } = useContext(AuthContext);

    return (
        <div className={`login-page ${!isLogin ? "active" : ""}`}>
            <LoginPage />
            <RegistrationPage />
        </div>
    )
}