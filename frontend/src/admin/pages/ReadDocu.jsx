import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function ReadDocu() {
  const [documents, setDocuments] = useState([]);
  const [groupedDocuments, setGroupedDocuments] = useState({});
  const apiService = createApiService();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/documents`
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const groupByTheme = (docs) => {
      return docs.reduce((groupedDocs, document) => {
        const theme = document.themesDocName;
        return {
          ...groupedDocs,
          [theme]: groupedDocs[theme]
            ? [...groupedDocs[theme], document]
            : [document],
        };
      }, {});
    };
    setGroupedDocuments(groupByTheme(documents));
  }, [documents]);

  const getFileNameFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="adminPage">
      <h3>
        Liste des documents&#x20;
        <FaInfoCircle
          size={16}
          title="Vous voyez ici l'ensemble des documents disponibles classés par espace documentaire."
        />
      </h3>
      {Object.keys(groupedDocuments).map((theme) => (
        <div key={theme}>
          <h4>{theme}</h4>
          <div className="divList">
            <ul>
              {groupedDocuments[theme].map((document) => (
                <li key={document.id}>
                  <span>
                    Nom affiché : <strong>{document.docName}</strong>
                  </span>
                  &#x0A;-&#x0A;
                  <span>
                    <em>
                      Nom du fichier : {getFileNameFromUrl(document.urlDoc)}
                    </em>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
