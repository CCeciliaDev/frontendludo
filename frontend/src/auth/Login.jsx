// import { accountService } from "../../_services";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import deco from "../assets/arrow.png";
import "./styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [authLogin, setAuthLogin] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  // const [creLogin, setCreLogin] = useState(""); //
  // const [crePassword, setCrePassword] = useState(""); //
  // const [showCrePassword, setShowCrePassword] = useState(false); //

  // Gestion de la modification des champs du formulaire auth
  const onChangeAuth = (e) => {
    if (e.target.name === "email") {
      setAuthLogin(e.target.value);
    } else if (e.target.name === "password") {
      setAuthPassword(e.target.value);
    }
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  // Gestion de la modification des champs du formulaire création
  // const onChangeCre = (e) => {
  //   if (e.target.name === "email") {
  //     setCreLogin(e.target.value);
  //   } else if (e.target.name === "password") {
  //     setCrePassword(e.target.value);
  //   }
  // };

  // ***** const reliée au formulaire de connexion *****
  const logAdmin = (e) => {
    e.preventDefault();

    const credentials = {
      email: authLogin,
      password: authPassword,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/adminlogin`, credentials)
      .then((res) => {
        // console.info("Login response:", res);
        if (res.status === 200) {
          console.info("Login successful, navigating to /admin/adminpage");
          // Stockez le token et le role dans le local storage
          localStorage.setItem("admin_token", res.data.token);
          localStorage.setItem("role", res.data.role);
          navigate("/admin");
        } else {
          console.info("Login failed, status code:", res.status);
        }
      })
      .catch((error) => {
        console.info("Error during login:", error);
      });
  };

  // const reliée au formulaire de création
  // const createAdmin = (e) => {
  //   e.preventDefault();
  //   const credentials = {
  //     email: creLogin,
  //     password: crePassword,
  //   };
  //   axios
  //     .post(`${import.meta.env.VITE_BACKEND_URL}/createadmin`, credentials)
  //     .then((res) => console.info(res))
  //     .catch((error) => console.info(error));
  // };

  return (
    <div className="mainDivLogin">
      <div className="titleLogin">
        Entrez dans votre espace d'administration
      </div>
      <img className="decoLogin" src={deco} alt="deco galet" />
      <form className="formLogin" onSubmit={logAdmin}>
        <div className="divInputLogin">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            name="email"
            value={authLogin}
            onChange={onChangeAuth}
          />
        </div>
        <div className="divInputLogin">
          <label htmlFor="password">Mot de passe</label>
          <input
            type={passwordShown ? "text" : "password"}
            name="password"
            value={authPassword}
            onChange={onChangeAuth}
          />

          {/* eslint-disable-next-line */}
            <div className="visibilyPassword" onClick={togglePasswordVisiblity}>
            {passwordShown ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div className="group">
          <button type="submit" className="buttonAdminLogin">
            Connexion
          </button>
        </div>
      </form>
      <br />

      {/* Création d'un nouveau couple email/mot de passe */}

      {/* <form onSubmit={createAdmin}>
        <div className="group">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            name="email"
            value={creLogin}
            onChange={onChangeCre}
          />
        </div>
        <div className="group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type={showCrePassword ? "text" : "password"}
            name="password"
            value={crePassword}
            onChange={onChangeCre}
          />
          <span
            onClick={() => setShowCrePassword(!showCrePassword)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowCrePassword(!showCrePassword);
              }
            }}
            tabIndex={0}
            role="button"
          >
            {showCrePassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="group">
          <button type="submit">Créer</button>
        </div>
      </form> */}
    </div>
  );
}
