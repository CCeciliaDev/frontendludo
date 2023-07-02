import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function UpdatePassW() {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedPassword, setSelectedPassword] = useState(null); // ajout
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchPass = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/pass`
        );
        setThemes(response.data);
        // ajout
        if (response.data.length > 0) {
          setSelectedTheme(response.data[0]); // Sélectionnez le premier mot de passe par défaut
          setSelectedPassword(response.data[0]); // Définissez les données du premier mot de passe dans l'état
        }
        // ajout
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes:", error);
      }
    };
    fetchPass();
  }, []);

  const handleThemeChange = (e) => {
    const foundTheme = themes.find(
      (theme) => theme.id === Number(e.target.value)
    );
    setSelectedTheme(foundTheme);
    setSelectedPassword(foundTheme);
    if (foundTheme) {
      setNewName(foundTheme.passName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTheme) return;

    try {
      await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/pass/${selectedTheme.id}`,
        {
          idThemesDoc: selectedTheme.idThemesDoc,
          password: newPassword,
          passName: newName,
        }
      );
      setSelectedTheme(null);
      setNewPassword("");
      setNewName("");
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modifier un mot de passe&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier le mot de passe de vos espaces documentaires."
        />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="themeSelect">
          Sélectionnez un espace documentaire :
        </label>
        <select
          id="themeSelect"
          value={selectedTheme?.id || ""}
          onChange={handleThemeChange}
        >
          <option value="">--Choisissez un espace documentaire--</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.themesDocName}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="newName">Login de l'espace documentaire :</label>
        {/* <input
          id="newName"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        /> */}
        <input
          id="newName"
          type="text"
          value={selectedPassword?.passName || ""}
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        <label htmlFor="newPassword">Saisir un nouveau mot de passe :</label>
        <div className="passwordInput">
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle-button"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="containButton">
          <button className="addButton" type="submit">
            Modifier le mot de passe
          </button>
        </div>
      </form>
      {updateSuccess && (
        <p className="success-message">
          Le mot de passe a été mis à jour avec succès.
          <br />
          N'oubliez pas de le noter dans un endroit sûr.
        </p>
      )}
    </div>
  );
}
