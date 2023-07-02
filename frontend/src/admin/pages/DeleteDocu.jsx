import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function DeleteDocu() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/documents`
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des documents :", error);
      }
    };

    fetchDocuments();
  }, []);

  const groupedDocuments = documents.reduce((grouped, document) => {
    const newGrouped = { ...grouped };
    if (!newGrouped[document.themesDocName]) {
      newGrouped[document.themesDocName] = [];
    }
    newGrouped[document.themesDocName].push(document);
    return newGrouped;
  }, {});

  const handleDelete = async () => {
    setShowConfirmDialog(false);

    try {
      await Promise.all(
        selectedDocuments.map((documentId) =>
          apiService.delete(
            `${import.meta.env.VITE_BACKEND_URL}/documents/${documentId}`
          )
        )
      );
      setDocuments(
        documents.filter((document) => !selectedDocuments.includes(document.id))
      );
      setSelectedDocuments([]);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la suppression des documents :", error);
    }
  };

  const handleCheckboxChange = (e, documentId) => {
    if (e.target.checked) {
      setSelectedDocuments([...selectedDocuments, documentId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter((id) => id !== documentId));
    }
  };

  const getFileNameFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="adminPage">
      <h3>
        Supprimer des documents&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici supprimer un ou plusieurs documents."
        />
      </h3>
      {Object.entries(groupedDocuments).map(([category, docs]) => (
        <div key={category}>
          <h4>{category}</h4>
          <div className="divList">
            {docs.map((document) => (
              <div key={document.id}>
                <input
                  type="checkbox"
                  id={`document-${document.id}`}
                  onChange={(e) => handleCheckboxChange(e, document.id)}
                />
                <span htmlFor={`document-${document.id}`}>
                  Nom affiché : <strong>{document.docName}</strong>&#x0A;-&#x0A;
                  <em>
                    Nom du fichier : {getFileNameFromUrl(document.urlDoc)}
                  </em>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="containButton">
        <button
          className="addButton"
          type="button"
          onClick={() => setShowConfirmDialog(true)}
        >
          Supprimer ces documents
        </button>
      </div>
      {showConfirmDialog && (
        <div className="containButton confirm-dialog">
          <p>
            Voulez-vous vraiment supprimer définitivement les documents
            sélectionnés ?
          </p>
          <button className="suppButton" type="button" onClick={handleDelete}>
            Confirmer
          </button>
          <button
            className="annulButton"
            type="button"
            onClick={() => setShowConfirmDialog(false)}
          >
            Annuler
          </button>
        </div>
      )}
      {deleteSuccess && (
        <p className="success-message">
          Les documents ont été supprimés avec succès.
        </p>
      )}
    </div>
  );
}
