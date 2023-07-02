import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/ArticleCard.css";
import defaultImage from "../../assets/deco3.png";

function formatDate(dateString) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return formatter.format(date);
}

function newlineToBreak(text) {
  return { __html: text.replace(/\n/g, "<br />") };
}

export default function ArticleCard({
  id,
  titleArticle,
  dateArticle,
  textArticle,
  urlImg,
}) {
  console.info(id);
  function truncateText(text, maxLength = 200, replacementText = "...") {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength)}${replacementText}`;
  }
  const truncatedText = truncateText(textArticle, 200); // Tronquer le texte à 150 caractères

  return (
    <div className="divArticleCard">
      <div className="divFlexArticleCard">
        <div className="divTextArticle">
          <Link to={`/articles/${id}`}>
            <h2>{titleArticle}</h2>
          </Link>
          <h6>{formatDate(dateArticle)}</h6>
          <p dangerouslySetInnerHTML={newlineToBreak(truncatedText)} />
        </div>

        <div className="divImgArticle">
          {urlImg ? (
            <img
              className="imgArticleCard"
              src={urlImg}
              alt={`illustration "${titleArticle}"`}
            />
          ) : (
            <img
              className="imgArticleCard"
              src={defaultImage}
              alt={`illustration "${titleArticle}"`}
            />
          )}
        </div>
      </div>
      <div className="divButtonArticleCard">
        <Link to={`/articles/${id}`}>
          <button className="buttonArticleCard" type="button">
            Lire
          </button>
        </Link>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  id: PropTypes.string.isRequired,
  titleArticle: PropTypes.string.isRequired,
  dateArticle: PropTypes.string.isRequired,
  textArticle: PropTypes.string.isRequired,
  urlImg: PropTypes.string,
};

ArticleCard.defaultProps = {
  urlImg: null,
};
