import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";
import "../styles/Adminmodules.css";

export default function DeleteTheme() {
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
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

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedThemes.map((id) =>
          apiService.delete(`${import.meta.env.VITE_BACKEND_URL}/themes/${id}`)
        )
      );
      setThemes(themes.filter((theme) => !selectedThemes.includes(theme.id)));
      setSelectedThemes([]);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Erreur lors de la suppression des thèmes:", error);
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Supprimer des thèmes&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici supprimer un ou plusieurs thèmes de classement de vos articles.&#x0A;Attention, cela ne sera pas possible si un article est classé sous le thème sélectionné."
        />
      </h3>
      <div className="divList">
        {themes.map((theme) => (
          <div key={theme.id}>
            <input
              type="checkbox"
              checked={selectedThemes.includes(theme.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedThemes([...selectedThemes, theme.id]);
                } else {
                  setSelectedThemes(
                    selectedThemes.filter((id) => id !== theme.id)
                  );
                }
              }}
            />
            <span>{theme.themesArticleName}</span>
          </div>
        ))}
      </div>
      <div className="containButton">
        <button
          className="addButton"
          type="button"
          onClick={() => setShowConfirmation(true)}
        >
          Supprimer ces thèmes
        </button>
      </div>
      {showConfirmation && (
        <div className="containButton confirmation-message">
          <p>
            Êtes-vous sûr de vouloir définitivement supprimer les thèmes
            sélectionnés ?
          </p>
          <button className="suppButton" type="button" onClick={handleDelete}>
            Confirmer
          </button>
          <button
            className="annulButton"
            type="button"
            onClick={() => setShowConfirmation(false)}
          >
            Annuler
          </button>
        </div>
      )}
      {deleteSuccess && (
        <p className="success-message">
          Les thèmes sélectionnés ont été supprimés avec succès.
        </p>
      )}
    </div>
  );
}
