import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Login() {
    const {setToken} = useContext(AppContext)
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // console.log(data)

    if (data.errors) {
      setErrors(data.errors);
    } else {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate("/")
    }

  }

  return (
    <>
      <h1 className="title">Bejelentkezés</h1>

      <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">

        <div>
          <input
            type="text"
            placeholder="Email cím"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Jelszó"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
                    {errors.password && <p className="error">{errors.password}</p>}

        </div>

        <button className="primary-btn">Bejelentkezés</button>
      </form>
    </>
  );
}
