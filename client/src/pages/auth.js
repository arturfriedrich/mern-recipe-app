import { Link } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";

export const Auth = ({ mode }) => {
    const title = mode === 'login' ? 'Login' : 'Register';
    const linkText = mode === 'login' ? "You don't have an account? Make one." : 'You already have an account? Log in.';
    const linkTo = mode === 'login' ? '/register' : '/auth';
    const form = mode === 'login' ? <Login /> : <Register />;
  
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">{title}</h1>
                {form}
                <div className="text-center mt-3">
                  <Link className="link" to={linkTo}>{linkText}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };