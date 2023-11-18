import { useState } from "react";

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        login({
            username: username,
            password: password,
        });

        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h2>Login to app</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
