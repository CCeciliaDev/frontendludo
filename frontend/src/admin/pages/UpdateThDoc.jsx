import React, { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function UpdateThDoc() {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [newThemeName, setNewThemeName] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/thdoc`
        );
        setThemes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes :", error);
      }
    };

    fetchThemes();
  }, []);

  const handleUpdate = async () => {
    try {
      await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/thdoc/${selectedTheme}`,
        {
          themesArticleName: newThemeName,
        }
      );
      setThemes(
        themes.map((theme) =>
          theme.id === selectedTheme
            ? { ...theme, themesDocName: newThemeName }
            : theme
        )
      );
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
      setSelectedTheme(""); // Réinitialise le select après le clic
    } catch (error) {
      console.error("Erreur lors de la mise à jour du thème :", error);
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modifier un espace documentaire&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier le nom des espaces documentaires déjà créés"
        />
      </h3>
      <label htmlFor="themeSelect">Sélectionnez un espace documentaire :</label>
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
      {selectedTheme && (
        <div>
          <label htmlFor="newThemeName">
            Nouveau nom de l'espace documentaire :
          </label>
          <input
            id="newThemeName"
            type="text"
            value={newThemeName}
            onChange={(e) => setNewThemeName(e.target.value)}
          />
          <div className="containButton">
            <button className="addButton" type="button" onClick={handleUpdate}>
              Mettre à jour la catégorie
            </button>
          </div>
        </div>
      )}
      {updateSuccess && (
        <p className="success-message">
          La catégorie a été mis à jour avec succès.
        </p>
      )}
    </div>
  );
}
