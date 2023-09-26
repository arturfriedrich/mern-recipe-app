import { Link } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";

export const Auth = ({ mode }) => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">{ mode === "login" ? <>Login</> : <>Register</> }</h1>
                            { mode === "login" ? <Login /> : <Register /> }
                            <div className="text-center mt-3">
                            { mode === "login" ? <Link className="link" to="/register">You don't have an account? Make one.</Link> : <Link className="link" to="/auth">You already have an account? Log in.</Link> } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};