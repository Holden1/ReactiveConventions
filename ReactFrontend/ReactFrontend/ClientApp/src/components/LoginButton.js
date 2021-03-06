import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    if (!isAuthenticated)
        return <button className="btn" onClick={() => loginWithRedirect()}>Log In</button>;
    else
        return (
            <button className="btn" onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
            </button>
        );
};

export default LoginButton;