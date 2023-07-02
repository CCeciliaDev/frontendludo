import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function UpdateTheme() {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themeName, setThemeName] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/themes`
        );
        setThemes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes:", error);
      }
    };
    fetchThemes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTheme) return;

    try {
      await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/themes/${selectedTheme.id}`,
        {
          themesArticleName: themeName,
        }
      );

      // Update the local state
      setThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === selectedTheme.id
            ? {
                ...theme,
                themesArticleName: themeName,
              }
            : theme
        )
      );
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du thème:", error);
    }
  };

  const handleSelectChange = (e) => {
    const foundTheme = themes.find(
      (theme) => theme.id === Number(e.target.value)
    );
    if (foundTheme) {
      setSelectedTheme(foundTheme);
      setThemeName(foundTheme.themesArticleName);
    }
    setSubmitSuccess(false); // Réinitialise le submitSuccess
  };

  return (
    <div className="adminPage">
      <h3>
        Modification des thèmes&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier le nom des thèmes déjà créés"
        />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="themeSelection">Sélectionner un thème :</label>
        <select
          id="themeSelection"
          value={selectedTheme?.id || ""}
          onChange={handleSelectChange}
        >
          <option value="">Choisir un thème</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.themesArticleName}
            </option>
          ))}
        </select>
        {selectedTheme && (
          <>
            <label htmlFor="themeName">Nouveau nom du thème :</label>
            <input
              id="themeName"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
            />
          </>
        )}
        <div className="containButton">
          <button className="addButton" type="submit">
            Mettre à jour le thème
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          Le thème a été mis à jour avec succès.
        </p>
      )}
    </div>
  );
}
