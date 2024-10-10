import {Link, Outlet} from "react-router-dom"

export default function Layout() {
    return (
        <>
        <header>
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>

        <main>
            <Outlet/>
        </main>
        </>
    );
}