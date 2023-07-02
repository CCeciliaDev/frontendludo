import React, { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function ReadArticle() {
  const [articles, setArticles] = useState([]);
  const apiService = createApiService();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/articles`
        );
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="adminPage">
      <h3>
        Liste des articles&#x20;
        <FaInfoCircle
          size={16}
          title="Vous voyez ici l'ensemble des articles publiés, classés par date et suivis de leur thème."
        />
      </h3>
      <div className="divList">
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <span>
                {new Date(article.dateArticle).toLocaleDateString("fr-FR")}
                &#x20;-&#x20;<strong>{article.titleArticle}</strong>
                &#x20;-&#x20;
                <em>Thème&#x20;:&#x20;{article.themesArticleName}</em>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
