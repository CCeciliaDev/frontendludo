import React, { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function DeletePassW() {
  const [passw, setPass] = useState([]);
  const [selectedPass, setSelectedPass] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/pass`
        );
        setPass(response.data);
        console.info("data :", response);
      } catch (error) {
        console.error("Erreur lors de la récupération des passwords :", error);
      }
    };

    fetchPasswords();
  }, []);

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedPass.map((id) =>
          apiService.delete(`${import.meta.env.VITE_BACKEND_URL}/pass/${id}`)
        )
      );
      setPass(passw.filter((pass) => !selectedPass.includes(pass.id)));
      setSelectedPass([]);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Erreur lors de la suppression des mots de passe :", error);
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Supprimer des mots de passe correspondants aux catégories :&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici supprimer un ou plusieurs mots de passe."
        />
      </h3>
      <div className="divList">
        {passw.map((pass) => (
          <div key={pass.id}>
            <input
              type="checkbox"
              checked={selectedPass.includes(pass.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedPass([...selectedPass, pass.id]);
                } else {
                  setSelectedPass(selectedPass.filter((id) => id !== pass.id));
                }
              }}
            />
            <span>
              <strong>{pass.themesDocName}</strong> - Nom d'utilisateur :&#x20;
              {pass.passName}
            </span>
          </div>
        ))}
      </div>
      <div className="containButton">
        <button
          className="addButton"
          type="button"
          onClick={() => setShowConfirmation(true)}
        >
          Supprimer ces mots de passe
        </button>
      </div>
      {showConfirmation && (
        <div className="containButton confirmation-message">
          <p>
            Êtes-vous sûr de vouloir supprimer les mots de passe sélectionnés ?
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
          Les mots de passe sélectionnés ont été supprimés avec succès.
        </p>
      )}
    </div>
  );
}
