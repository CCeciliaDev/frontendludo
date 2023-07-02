import React, { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

// Attention, mettre les bonnes routes back
export default function ReadThDoc() {
  const [themes, setThemes] = useState([]);
  const apiService = createApiService();

  useEffect(() => {
    const fetchThemesDoc = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/thdoc`
        );
        setThemes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes :", error);
      }
    };

    fetchThemesDoc();
  }, []);

  return (
    <div className="adminPage">
      <h3>
        Liste des espaces documentaires&#x20;
        <FaInfoCircle
          size={16}
          title="Vous voyez ici l'ensemble des espaces documentaires créés."
        />
      </h3>
      <div className="divList">
        <ul>
          {themes.map((theme) => (
            <li key={theme.id}>
              <span> {theme.themesDocName}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
