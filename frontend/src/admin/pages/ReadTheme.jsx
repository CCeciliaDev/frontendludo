import React, { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import "../styles/Adminmodules.css";
import createApiService from "../../services/RequestApi";

export default function ReadTheme() {
  const [themes, setThemes] = useState([]);
  const apiService = createApiService();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/themes`
        );
        setThemes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <div className="adminPage">
      <h3>
        Liste des thèmes des articles&#x20;
        <FaInfoCircle
          size={16}
          title="Vous voyez ici l'ensemble des thèmes créés afin de classer vos articles"
        />
      </h3>
      <div className="divList">
        <ul>
          {themes.map((theme) => (
            <li key={theme.id}>
              <span> {theme.themesArticleName}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
