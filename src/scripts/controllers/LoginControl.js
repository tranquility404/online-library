import { login, register } from "../api/ApiRequests.js";
import { AuthStatusContext } from "../../ui/pages/LoginPage/AuthStatusContext.jsx";
import { useContext } from "react";

export const useAuthHelper = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthStatusContext);

    const initiateRegistration = async (name, email, password, navigate) => {
        const res = await register({ name, email, password });

        if (res.status == 200) {
            setIsAuthenticated(true);
            navigate("/");
            console.log("register success");
        }

        console.log(res.data);
    };

    const initiateLogin = async (email, password, navigate) => {
        const res = await login({ email, password });

        if (res.status == 200) {
            setIsAuthenticated(true);
            navigate("/");
            console.log("login success");
        }

        console.log(res.data);
    };

    return {
        isAuthenticated,
        initiateLogin,
        initiateRegistration,
    };
};