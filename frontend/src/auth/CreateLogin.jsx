// import { accountService } from "../../_services";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Composant non destiné à être déployé.
// A conserver en attendant de mettre en place la récupération du mot de passe.

export default function CreateLogin() {
  const [creLogin, setCreLogin] = useState("");
  const [crePassword, setCrePassword] = useState("");
  const [showCrePassword, setShowCrePassword] = useState(false);

  // Gestion de la modification des champs du formulaire création
  const onChangeCre = (e) => {
    if (e.target.name === "email") {
      setCreLogin(e.target.value);
    } else if (e.target.name === "password") {
      setCrePassword(e.target.value);
    }
  };

  // const reliée au formulaire de création
  const createAdmin = (e) => {
    e.preventDefault();
    const credentials = {
      email: creLogin,
      password: crePassword,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/createadmin`, credentials)
      .then((res) => console.info(res))
      .catch((error) => console.info(error));
  };

  return (
    <div>
      <br />
      <form onSubmit={createAdmin}>
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
      </form>
    </div>
  );
}
