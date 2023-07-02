import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import "../styles/Adminmodules.css";
import createApiService from "../../services/RequestApi";

export default function DeleteThDoc() {
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/thdoc`
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
          apiService.delete(`${import.meta.env.VITE_BACKEND_URL}/thdoc/${id}`)
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
        Supprimer un espace documentaire&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici supprimer un ou plusieurs espaces documentaires.&#x0A;Attention, cela ne sera pas possible si un document est rangé dans l'espace sélectionné&#x0A;ou si un mot de passe est déjà créé pour cet espace."
        />
      </h3>
      {themes.map((theme) => (
        <div className="divList" key={theme.id}>
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
          <span>{theme.themesDocName}</span>
        </div>
      ))}
      <div className="containButton">
        <button
          className="addButton"
          type="button"
          onClick={() => setShowConfirmation(true)}
        >
          Supprimer ces catégories
        </button>
      </div>
      {showConfirmation && (
        <div className="containButton confirmation-message">
          <p>
            Êtes-vous sûr de vouloir définitivement supprimer les espaces
            sélectionnées ?
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
