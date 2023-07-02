import { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import "../styles/ArticlesDisplay.css";
import deco from "../../assets/arrow.png";

export default function ArticlesDisplay() {
  const [articles, setArticles] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(4); // nombre d'articles par page

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/articles`
        );
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when theme changes
  }, [selectedTheme]);

  // Filtrer les articles par thème
  const filteredArticles = selectedTheme
    ? articles.filter((article) => article.themesArticleName === selectedTheme)
    : articles;

  // Obtenir les articles actuels
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Générer les numéros de page
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredArticles.length / articlesPerPage);
    i += 1
  ) {
    pageNumbers.push(i);
  }

  const themes = articles.map((article) => article.themesArticleName);
  const uniqueThemes = [...new Set(themes)];

  return (
    <div className="mainDivArticles">
      <div className="divPresArticles">
        <div className="divTitleArticles">
          <img className="deco" src={deco} alt="deco galet" />
          <h3>Un peu de lecture...</h3>
        </div>
        <br />
        {/* <p className="infoArticles">
          Vous pouvez filtrer les articles par thèmes si vous le souhaitez.
        </p> */}
        <div className="themesContainer">
          Filtrer par thèmes :
          <button
            type="button"
            id="buttonAllThemes"
            className={selectedTheme === "" ? "themeSelected" : "theme"}
            onClick={() => setSelectedTheme("")}
          >
            Tous les thèmes
          </button>
          {uniqueThemes.map((theme) => (
            <button
              type="button"
              id="buttonUniqueTheme"
              className={selectedTheme === theme ? "themeSelected" : "theme"}
              key={theme}
              onClick={() => setSelectedTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
        <div className="divFlexArticles">
          {currentArticles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              dateArticle={article.dateArticle}
              titleArticle={article.titleArticle}
              textArticle={article.textArticle}
              urlImg={article.urlImg}
            />
          ))}
        </div>
        <div>
          {pageNumbers.map((number) => (
            <button
              className="paginationArticle"
              type="button"
              key={number}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
