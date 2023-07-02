import React, { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function ReadPass() {
  const [passw, setPass] = useState([]);
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

  return (
    <div className="adminPage">
      <h3>
        Liste des mots de passe&#x20;
        <FaInfoCircle
          size={16}
          title="Vous voyez ici l'ensemble des espaces documentaires ayant déjà un mot de passe attribué."
        />
      </h3>
      <h4>Les espaces documentaires suivants ont un mot de passe dédié :</h4>
      <div className="divList">
        <ul>
          {passw.map((pass) => (
            <li key={pass.id}>
              <span>
                <strong>{pass.themesDocName}</strong> - Nom d'utilisateur&#x20;
                :&#x20;
                {pass.passName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
