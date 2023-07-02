import { useState, useEffect } from "react";
// import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Adminmodules.css";
import { FaInfoCircle } from "react-icons/fa";
import ImgUploader from "../components/ImgUploader";
import createApiService from "../../services/RequestApi";

const CustomLink = Quill.import("formats/link");

class AbsoluteLink extends CustomLink {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("href", value); // Spécifiez l'URL absolue directement
    node.setAttribute("target", "_blank"); // Ouvre le lien dans un nouvel onglet
    return node;
  }
}

Quill.register(AbsoluteLink, true);

export default function CreateArticle() {
  const [dateArticle, setDateArticle] = useState("");
  const [titleArticle, setTitleArticle] = useState("");
  const [textArticle, setTextArticle] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [archived, setArchived] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [themes, setThemes] = useState([]);
  const [themeId, setThemeId] = useState("");
  const apiService = createApiService();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}themes`
        );
        setThemes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes:", error);
      }
    };
    fetchThemes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.post(`${import.meta.env.VITE_BACKEND_URL}/articles`, {
        dateArticle,
        titleArticle,
        textArticle,
        urlImg,
        archived: archived ? 1 : 0, // Ici, nous passons 1 si archived est true, sinon 0
        idThemesArticle: themeId,
      });
      setDateArticle("");
      setTitleArticle("");
      setTextArticle("");
      setUrlImg("");
      setArchived(false);
      setThemeId("");
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
    }
    console.info("archived :", archived);
  };

  useEffect(() => {
    console.info("Selected theme ID:", themeId);
  }, [themeId]);

  const handleImageUploadSuccess = (data) => {
    // vérifiez si la réponse contient l'URL de l'image et gérez les erreurs si nécessaire
    if (data.url) {
      setUrlImg(data.url);
    } else {
      // Affichez un message d'erreur ou gérez les erreurs comme vous le souhaitez
      console.error(
        "Erreur lors de l'upload de l'image. La réponse ne contient pas d'URL."
      );
    }
  };

  const handleImageDelete = () => {
    setUrlImg("");
  };

  return (
    <div className="adminPage">
      <h3>
        Ajouter un article&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici ajouter de nouveaux articles.&#x0A;Pour un enregistrement réussi, n'oubliez pas sélectionner un thème.&#x0A;Attention, ajout possible d'une seule image par article.&#x0A;Pour ajouter un lien, insérez l'URL entière avec http:// ou https://&#x0A;sinon le lien ne fontionnera pas."
        />
      </h3>
      <form onSubmit={handleSubmit}>
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
                [{ link: "auto" }, { link: AbsoluteLink }], // Utilisez AbsoluteLink pour autoriser les liens absolus avec target="_blank"
                ["clean"],
              ],
            }}
          />
        </div>

        <div>
          <label htmlFor="themeArticle">Thème de l'article :</label>
          <select
            id="themeArticle"
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
          >
            <option value="">Sélectionner un thème</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.themesArticleName}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="fileUploader">Télécharger une image :</label>
        <ImgUploader onUploadSuccess={handleImageUploadSuccess} />
        <img
          className="previewImage"
          src={urlImg}
          alt="illustration de l'article"
          style={{ display: urlImg ? "block" : "none" }}
        />
        {urlImg && (
          <button onClick={handleImageDelete} type="button">
            Supprimer cette image
          </button>
        )}
        <div className="containArchived">
          <label htmlFor="archivedArticle">Archivé :</label>
          <input
            id="archivedArticle"
            type="checkbox"
            checked={archived}
            onChange={(e) => setArchived(e.target.checked)}
          />
        </div>
        <div className="containButton">
          <button className="addButton" type="submit">
            Ajouter cet article
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">L'article a été créé avec succès.</p>
      )}
    </div>
  );
}
