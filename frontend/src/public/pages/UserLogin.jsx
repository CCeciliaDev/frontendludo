import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [idThemesDoc, setIdThemesDoc] = useState(null);
  const [passName, setPassName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.info(idThemesDoc);

  useEffect(() => {
    // Réinitialiser l'état lors du montage du composant
    setPassword("");
    setPasswordShown(false);
    setIdThemesDoc(null);
    setPassName("");
    setErrorMessage("");
  }, []);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setPassName(event.target.value);
  };

  const logUser = (event) => {
    event.preventDefault();

    const credentials = {
      passName,
      password,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/userlogin`, credentials)
      .then((res) => {
        console.info("Login response:", res);
        if (res.status === 200) {
          console.info("Login successful");
          // Stockez le token dans le local storage
          localStorage.setItem("user_token", res.data.token);
          localStorage.setItem("role", res.data.role);
          // console.info(
          //   "Token after login:",
          //   localStorage.getItem("user_token")
          // );
          console.info("Role after login:", localStorage.getItem("role"));

          if (res.data.idThemesDoc) {
            const themesDoc = res.data.idThemesDoc;
            setIdThemesDoc(themesDoc);
            // console.info("Response data:", res.data);
            // console.info("Response token:", res.data.token);
            console.info("Themes Doc:", themesDoc);
            navigate(`/user/spaces?idThemesDoc=${themesDoc}`);
          }
        } else {
          console.info("Login failed, status code:", res.status);
          setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
        }
      })
      .catch((error) => {
        console.info("Error during login:", error);
        setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
      });
  };

  return (
    <div className="mainDivUserLogin">
      <div className="divPresUserLogin">
        <form onSubmit={logUser}>
          <div className="divInputUser">
            <label htmlFor="newPassword">Login :</label>
            <input
              id="name"
              type="text"
              value={passName}
              onChange={handleNameChange}
            />
            <label htmlFor="newPassword">Mot de passe :</label>
            <input
              id="password"
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            {/* eslint-disable-next-line */}
            <div className="visibilyPassword" onClick={togglePasswordVisiblity}>
              {passwordShown ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="divButtonSpaces">
            <button className="enterButton" type="submit">
              Entrer
            </button>
          </div>
        </form>
        {errorMessage && <div className="errorMessageUser">{errorMessage}</div>}
      </div>
    </div>
  );
}
