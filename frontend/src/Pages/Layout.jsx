import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext";

export default function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
const navigate = useNavigate()

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
        method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token');
        navigate('/')
    }
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user ? (
            <div>
              <div>Üdv újra {user.name}</div>
              <Link to="/create">Új bejegyzés</Link>
              <form onSubmit={handleLogout}>
                <button> Kijelentkezés</button>
              </form>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
