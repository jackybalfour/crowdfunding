import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import './LoginForm.css'

function LoginForm() {

    const [, setLoggedIn] = useOutletContext();
    // State
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    // Hook
    const navigate = useNavigate();

    // Actions
    const handleChange = (event) => {
        const { id, value } = event.target;

        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const postData = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api-token-auth/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }
        );
        return response.json();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            const { token } = await postData();
            window.localStorage.setItem("token", token);
            setLoggedIn(true);
            navigate("/");
        }
    };
    return (
        <form className="loginform" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input className="field"
                    type="text"
                    id="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input className="field"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="Password"
                />
            </div>
            <button className="buttonlogin" type="submit">
                Login
            </button>
        </form>
    );
}
export default LoginForm;