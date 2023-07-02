import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import FileUploader from "../components/FileUploader";
import "../styles/Adminmodules.css";
import createApiService from "../../services/RequestApi";

export default function UpdateDocu() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [themes, setThemes] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [docName, setDocName] = useState("");
  const [urlDoc, setUrlDoc] = useState("");
  const [themeDoc, setThemeDoc] = useState("");
  const apiService = createApiService();

  useEffect(() => {
    const fetchDocu = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/documents`
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des documents :", error);
      }
    };
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/thdoc`
        );
        setThemes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des thèmes :", error);
      }
    };
    fetchDocu();
    fetchThemes();
  }, []);

  const handleDocuSelection = (document) => {
    setSelectedDoc(document);
    setDocName(document.docName);
    setUrlDoc(document.urlDoc);
    const foundTheme = themes.find(
      (theme) => theme.id === document.idThemesDoc
    );
    if (foundTheme) {
      setCurrentTheme(foundTheme);
      setThemeDoc(foundTheme.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoc) return;
    // Conservez la valeur actuelle du thème s'il n'est pas modifié
    const themeIdToSubmit =
      themeDoc === currentTheme.id ? currentTheme.id : themeDoc;

    try {
      await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/documents/${selectedDoc.id}`,
        {
          docName,
          urlDoc,
          idThemesDoc: themeIdToSubmit,
        }
      );

      // Update the local state
      setDocuments((prevDocuments) =>
        prevDocuments.map((document) =>
          document.id === selectedDoc.id
            ? {
                ...document,
                docName,
                urlDoc,
                idThemesDoc: themeIdToSubmit,
              }
            : document
        )
      );
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document:", error);
    }
  };

  const handleFileUploadSuccess = (data) => {
    if (data.url) {
      setUrlDoc(data.url);
    } else {
      console.error(
        "Erreur lors de l'upload de l'image. La réponse ne contient pas d'URL."
      );
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modifier un document&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier le nom de vos documents.&#x0A;Vous pouvez également remplacer un document avec un nouveau fichier"
        />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Document-selection">Sélectionner un document :</label>
        <select
          id="Document-selection"
          value={selectedDoc?.id || ""}
          onChange={(e) => {
            const foundDoc = documents.find(
              (doc) => doc.id === Number(e.target.value)
            );
            if (foundDoc) {
              handleDocuSelection(foundDoc);
            }
          }}
        >
          <option value="">Choisir un document</option>
          {themes.map((theme) => (
            <optgroup key={theme.id} label={theme.themesDocName}>
              {documents
                .filter((document) => document.idThemesDoc === theme.id)
                .map((document) => (
                  <option key={document.id} value={document.id}>
                    {document.docName}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        {selectedDoc && (
          <>
            <label htmlFor="docName">
              Nom du document affiché dans l'espace utilisateur :
            </label>
            <input
              id="docName"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />

            <div>
              <label htmlFor="themeDoc">
                Espace documentaire auquek est rattaché le document :
              </label>
              <select
                id="themeDoc"
                value={themeDoc}
                onChange={(e) => setThemeDoc(e.target.value)}
              >
                <option value="">Sélectionner un thème</option>
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.themesDocName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="currentFileName">Nom du fichier actuel :</label>
              <p id="currentFileName">{urlDoc.split("/").pop()}</p>
            </div>
            <label htmlFor="fileUploader">
              Télécharger un nouveau document :
            </label>
            <FileUploader
              id="fileUploader"
              onUploadSuccess={handleFileUploadSuccess}
            />
          </>
        )}
        <div className="containButton">
          <button className="addButton" type="submit">
            Mettre à jour le document
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          Le document a été mis à jour avec succès.
        </p>
      )}
    </div>
  );
}
