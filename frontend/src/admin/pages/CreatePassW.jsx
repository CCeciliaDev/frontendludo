import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function CreatePassW() {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reloadThemes, setReloadThemes] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const apiService = createApiService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post(`${import.meta.env.VITE_BACKEND_URL}/pass`, {
        idThemesDoc: selectedTheme,
        password: newPassword,
        passName: newName,
      });
      setNewPassword("");
      setSelectedTheme("");
      setNewName("");
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
      setReloadThemes(true);
    } catch (error) {
      console.error("Erreur lors de la création du mot de passe:", error);
    }
  };

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/passless`
        );
        setThemes(response.data);
        console.info(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes:", error);
      }
    };
    fetchThemes();
    setReloadThemes(false);
  }, [reloadThemes]);

  return (
    <div className="adminPage">
      <h3>
        Créer un nouveau mot de passe&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici créer un mot de passe pour les espaces documentaires qui n'en sont pas dotés.&#x0A;Si vous n'avez aucun espace documentaire le menu déroulant, cela signifie&#x0A;que tout vos espaces documentaires sont déjà associés à un mot de passe."
        />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="themeSelect">
          Sélectionnez un espace documentaire :
        </label>
        <select
          id="themeSelect"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
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
        {/* New label for the Name input */}
        <input
          id="newName"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        <label htmlFor="newPassword">Mot de passe :</label>
        <div className="password-input">
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
            Enregistrer le nouveau mot de passe
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          Le mot de passe a été créé avec succès.
          <br />
          N'oubliez pas de le noter dans un endroit sûr.
        </p>
      )}
    </div>
  );
}
