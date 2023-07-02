import { useState, useEffect } from "react";
// import axios from "axios";
import ReactQuill from "react-quill";
import { FaInfoCircle } from "react-icons/fa";
import ImgUploader from "../components/ImgUploader";
import "react-quill/dist/quill.snow.css";
import "../styles/Adminmodules.css";
import createApiService from "../../services/RequestApi";

export default function UpdateArticle() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [dateArticle, setDateArticle] = useState("");
  const [titleArticle, setTitleArticle] = useState("");
  const [textArticle, setTextArticle] = useState("");
  const [themeArticle, setThemeArticle] = useState("");
  const [pictureArticle, setPictureArticle] = useState("");
  const [archived, setArchived] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [themes, setThemes] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(null);
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
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/themes`
        );
        setThemes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes :", error);
      }
    };
    fetchArticles();
    fetchThemes();
  }, []);

  const handleArticleSelection = (article) => {
    setSelectedArticle(article);
    setDateArticle(new Date(article.dateArticle).toISOString().substr(0, 10)); // formatage de la date
    setTitleArticle(article.titleArticle);
    setTextArticle(article.textArticle);
    setThemeArticle(article.id);
    setPictureArticle(article.urlImg);
    setArchived(article.archived === 1);
    const foundTheme = themes.find(
      (theme) => theme.id === article.idThemesArticle
    );
    if (foundTheme) {
      setCurrentTheme(foundTheme);
      setThemeArticle(foundTheme.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedArticle) return;
    // conservez la valeur actuelle du thème s'il n'est pas modifié
    const themeIdToSubmit =
      themeArticle === currentTheme.id ? currentTheme.id : themeArticle;

    try {
      await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/articles/${selectedArticle.id}`,
        {
          dateArticle,
          titleArticle,
          textArticle,
          idThemesArticle: themeIdToSubmit,
          urlImg: pictureArticle,
          archived: archived ? 1 : 0, // Ici, nous passons 1 si archived est true, sinon 0
        }
      );
      // Update the local state
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === selectedArticle.id
            ? {
                ...article,
                dateArticle,
                titleArticle,
                textArticle,
                idThemesArticle: themeArticle,
                urlImg: pictureArticle,
                archived: archived ? 1 : 0, // Ici, nous passons 1 si archived est true, sinon 0
              }
            : article
        )
      );
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article:", error);
    }
    console.info("archived :", archived);
  };

  const handleImageUploadSuccess = (data) => {
    if (data.url) {
      setPictureArticle(data.url);
    } else {
      console.error(
        "Erreur lors de l'upload de l'image. La réponse ne contient pas d'URL."
      );
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modification des articles&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier des articles déjà créés et publiés.&#x0A;Attention, ajout possible d'une seule image par article.&#x0A;Pour ajouter un lien, insérez l'URL entière avec http:// ou https://&#x0A;sinon le lien ne fontionnera pas."
        />
      </h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="Article-selection">Sélectionner un article :</label>
        <select
          id="Article-selection"
          value={selectedArticle?.id || ""}
          onChange={(e) => {
            const foundArticle = articles.find(
              (article) => article.id === Number(e.target.value)
            );
            if (foundArticle) {
              handleArticleSelection(foundArticle);
            }
          }}
        >
          <option value="">Choisir un article</option>
          {articles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.titleArticle}
            </option>
          ))}
        </select>
        {selectedArticle && (
          <>
            <label htmlFor="dateArticle">Date de l'article :</label>
            <input
              id="dateArticle"
              type="date"
              value={dateArticle}
              onChange={(e) => setDateArticle(e.target.value)}
            />

            <label htmlFor="titleArticle">Titre de l'article :</label>
            <input
              id="titleArticle"
              value={titleArticle}
              onChange={(e) => setTitleArticle(e.target.value)}
            />
            <div>
              <label htmlFor="textArticle">Texte :</label>
              <ReactQuill
                className="quill-editor"
                value={textArticle}
                onChange={setTextArticle}
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ align: [] }],
                    [{ link: "auto" }],
                    ["clean"],
                  ],
                }}
              />
            </div>

            <div>
              <label htmlFor="themeArticle">Thème de l'article :</label>
              <select
                id="themeArticle"
                value={themeArticle}
                onChange={(e) => setThemeArticle(e.target.value)}
              >
                <option value="">Sélectionner un thème</option>
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.themesArticleName}
                  </option>
                ))}
              </select>
            </div>
            <img
              className="previewImage"
              src={pictureArticle}
              alt="illustration de l'article"
              style={{ display: pictureArticle ? "block" : "none" }}
            />
            <label htmlFor="fileUploader">
              Télécharger une nouvelle image :
            </label>
            <ImgUploader onUploadSuccess={handleImageUploadSuccess} />
            <label htmlFor="archivedArticle">Archivé :</label>
            <input
              id="archivedArticle"
              type="checkbox"
              checked={archived}
              onChange={(e) => setArchived(e.target.checked)}
            />
          </>
        )}
        <div className="containButton">
          <button className="addButton" type="submit">
            Mettre à jour l'article
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          L'article a été mis à jour avec succès.
        </p>
      )}
    </div>
  );
}
