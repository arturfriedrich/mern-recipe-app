import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <Link className="navbar-brand" to="/">Home</Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
                </li>
                {!cookies.access_token ? (
                    <li className="nav-item">
                        <Link className="nav-link" to="/auth">Login/Register</Link>
                    </li>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/saved-recipes">Saved Recipes</Link>
                        </li>
                        <li className="nav-item d-flex justify-content-center align-items-center">
                            <button className="btn btn-danger" onClick={() => logout()}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};