import React, { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function ReadArticleArchived() {
  const [articlesArchived, setArticlesArchived] = useState([]);
  const apiService = createApiService();

  useEffect(() => {
    const fetchArticlesArchived = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/archivedarticles`
        );
        setArticlesArchived(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des articles archivés :",
          error
        );
      }
    };

    fetchArticlesArchived();
  }, []);

  return (
    <div className="adminPage">
      <h3>
        Liste des articles archivés&#x20;
        <FaInfoCircle
          size={16}
          title="Vous voyez ici l'ensemble des articles archivés, classés par date et suivis de leur thème."
        />
      </h3>
      <div className="divList">
        <ul>
          {articlesArchived.map((articleArchived) => (
            <li key={articleArchived.id}>
              <span>
                {new Date(articleArchived.dateArticle).toLocaleDateString(
                  "fr-FR"
                )}
                &#x20;-&#x20;<strong>{articleArchived.titleArticle}</strong>
                &#x20;-&#x20;
                <em>Thème&#x20;:&#x20;{articleArchived.themesArticleName}</em>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
