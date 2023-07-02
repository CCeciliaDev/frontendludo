import React, { useState, useEffect } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import createApiService from "../../services/RequestApi";
import "../styles/Uploaders.css";

export default function FileUploader({ onUploadSuccess, reset }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const apiService = createApiService();
  const token = localStorage.getItem("admin_token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setFile(null);
    setMessage("");
  }, [reset]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Veuillez sélectionner un fichier à télécharger.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const response = await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/send/file`,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.url) {
        setMessage("Document téléchargé avec succès");
        onUploadSuccess(response.data);
      } else {
        setMessage("Erreur lors de l'upload du document.");
      }
    } catch (error) {
      console.error("Erreur lors de l'upload du document:", error);
      setMessage("Erreur lors de l'upload du document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mainDivUploader">
      <input className="inputUpload" type="file" onChange={handleFileChange} />
      <button
        className="buttonUpload"
        type="button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Upload en cours..." : "Ajouter"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

FileUploader.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
