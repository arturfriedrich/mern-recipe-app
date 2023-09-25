import { useState } from "react";
import axios from "axios";

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    )
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="Login"
        />
    )
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:4000/auth/register", {
                username,
                password
            })
            alert("User registered successfully");
        } catch(error) {
            console.error(error)
        }
    };

    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            label="Register"
            onSubmit={onSubmit}
        />
    )
};

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <h1>{label}</h1>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username}
                    onChange={(event) =>  setUsername(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>

            <button type="submit">{label}</button>

        </form>
    )
};