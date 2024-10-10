import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Register() {
    const {setToken} = useContext(AppContext)
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'post',
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate("/")
      console.log(data);
    }

    console.dir(data);
  }

  return (
    <>
      <h1 className="title">Regisztráció</h1>

      <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Név"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
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
        <div>
          <input
            type="password"
            placeholder="Jelszó újra"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
                    {errors.password_confirmation && <p className="error">{errors.password_confirmation}</p>}

        </div>
        <button className="primary-btn">Regisztráció</button>
      </form>
    </>
  );
}
