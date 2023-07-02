import React, { useState, useEffect } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import createApiService from "../../services/RequestApi";
import "../styles/Uploaders.css";

export default function ImgUploader({ onUploadSuccess, reset }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const apiService = createApiService();
  const token = localStorage.getItem("admin_token");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    setImage(null);
    setMessage("");
  }, [reset]);

  const handleUpload = async () => {
    if (!image) {
      setMessage("Veuillez sélectionner une image à télécharger.");
      return;
    }
    const formData = new FormData();
    formData.append("img", image);

    try {
      setUploading(true);

      const response = await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/send/img`,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.info(response.data);

      if (response.data.url) {
        setMessage("L'image a été téléchargée avec succès.");
        onUploadSuccess({ url: response.data.url });
      } else {
        setMessage("Erreur lors du téléchargemrnt de l'image.");
      }
    } catch (error) {
      console.error("Erreur lors du téléchargemrnt de l'image:", error);
      setMessage("Erreur lors du téléchargemrnt de l'image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mainDivUploader">
      <input
        className="inputUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
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

ImgUploader.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
