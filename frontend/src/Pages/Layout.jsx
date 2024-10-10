import { useContext } from "react";
import {Link, Outlet} from "react-router-dom"
import { AppContext } from "./Context/AppContext";

export default function Layout() {
    const {user} = useContext(AppContext)
    return (
        <>
        <header>
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                {user ? (<div>{user.name}</div>
                ) :(
                    <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>        
                )}

            </nav>
        </header>

        <main>
            <Outlet/>
        </main>
        </>
    );
}