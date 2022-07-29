import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Navbar = () => {
    const { store, actions } = useContext(Context)
    const history = useHistory();

    useEffect(() => {

    }, [])

    useEffect(() => {
        if(store.currentUser === null) history.push('/login');
    }, [store.currentUser])

    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            {
                !!store.currentUser ?
                    (
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                                {store.currentUser?.user?.profile?.name || store.currentUser?.user?.email }
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={() => actions.handleLogout()}>Logout</button></li>
                            </ul>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    )
            }

        </ul>
    )
}

export default Navbar;