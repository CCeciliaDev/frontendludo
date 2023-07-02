import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import "../styles/ArticleRead.css";

function newlineToBreak(text) {
  return { __html: text.replace(/\n/g, "<br />") };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return formatter.format(date);
}

export default function ArticleRead() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/articles/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainDivArticle">
      <div className="divPresArticle">
        <p className="pDate">{formatDate(article.dateArticle)}</p>
        <div className="divTextArticleRead">
          <h2>{article.titleArticle}</h2>

          {article.urlImg && (
            <img
              src={article.urlImg}
              alt={`illustration "${article.titleArticle}"`}
            />
          )}
          <p
            className="pPresArticle"
            dangerouslySetInnerHTML={newlineToBreak(article.textArticle)}
          />
        </div>
        <div className="divBackArrow">
          <div>
            <Link className="linkArrow" to="/articles">
              <BsArrowLeftCircleFill size={25} color="#4c897c" />
            </Link>
          </div>
          <div>
            <Link className="linkText" to="/articles">
              Retour aux articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
