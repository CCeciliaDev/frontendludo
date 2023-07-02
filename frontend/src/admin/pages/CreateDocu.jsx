import { useState, useEffect } from "react";
// import axios from "axios";
import "../styles/Adminmodules.css";
import { FaInfoCircle } from "react-icons/fa";
import FileUploader from "../components/FileUploader";
import createApiService from "../../services/RequestApi";

export default function CreateDocu() {
  const [docName, setDocName] = useState(""); // ok
  const [fileUrl, setFileUrl] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [themes, setThemes] = useState([]); // ok
  const [themeId, setThemeId] = useState("");
  const apiService = createApiService();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/thdoc`
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
      await apiService.post(`${import.meta.env.VITE_BACKEND_URL}/documents`, {
        docName,
        urlDoc: fileUrl,
        idThemesDoc: themeId,
      });
      setDocName("");
      setFileUrl("");
      setThemeId("");
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la création de l'article:", error);
    }
  };

  useEffect(() => {
    console.info("Selected theme ID:", themeId);
  }, [themeId]);

  const handleFileUploadSuccess = (data) => {
    // vérifiez si la réponse contient l'URL de l'image et gérez les erreurs si nécessaire
    if (data.url) {
      setFileUrl(data.url);
    } else {
      // Affichez un message d'erreur ou gérez les erreurs comme vous le souhaitez
      console.error(
        "Erreur lors de l'upload de l'image. La réponse ne contient pas d'URL."
      );
    }
  };

  return (
    <div className="adminPage">
      <form onSubmit={handleSubmit}>
        <h3>
          Ajouter des documents&#x20;
          <FaInfoCircle
            size={16}
            title="Vous pouvez ici ajouter de nouveaux documents.&#x0A;Pour un enregistrement réussi, n'oubliez pas sélectionner un espace documentaire."
          />
        </h3>
        <label htmlFor="docName">
          Nom d'affichage du document dans l'espace documentaire :
        </label>
        <input
          id="docName"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />

        <div>
          <label htmlFor="themeDoc">Espace documentaire du document :</label>
          <select
            id="themeArticle"
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
          >
            <option value="">Sélectionner un thème</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.themesDocName}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="fileUploader">Télécharger un document :</label>
        <FileUploader
          key={submitSuccess}
          onUploadSuccess={handleFileUploadSuccess}
        />
        <div className="containButton">
          <button className="addButton" type="submit">
            Ajouter ce document
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">Le document a été créé avec succès.</p>
      )}
    </div>
  );
}
