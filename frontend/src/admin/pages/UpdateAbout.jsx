import { useState, useEffect } from "react";
// import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaInfoCircle } from "react-icons/fa";
import ImgUploader from "../components/ImgUploader";
import createApiService from "../../services/RequestApi";

export default function UpdateAbout() {
  const [aboutText, setAboutText] = useState("");
  const [qualifText, setQualifText] = useState("");
  const [xpText, setXpText] = useState("");
  const [aboutImgURL, setAboutImgURL] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/about`
        );
        console.info("Response data fetch:", response.data);
        setAboutText(response.data.about);
        setQualifText(response.data.qualifications);
        setXpText(response.data.experiences);
        setAboutImgURL(response.data.urlImgAbout);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des textes about : ",
          error
        );
      }
    };
    fetchText();
  }, []);

  const handleImageUploadSuccess = (data) => {
    if (data.url) {
      console.info("Uploaded image URL:", data.url);
      setAboutImgURL(data.url);
    } else {
      console.error(
        "Erreur lors de l'upload de l'image. La réponse ne contient pas d'URL."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.put(`${import.meta.env.VITE_BACKEND_URL}/about`, {
        about: aboutText,
        qualifications: qualifText,
        experiences: xpText,
        urlImgAbout: aboutImgURL,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des textes about : ", error);
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modification de ma présentation&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier les 3 sections de la page Présentation.&#x0A;Evitez de laisser une section vide car cela dégradera l'aspect&#x0A;et le contenu de votre page."
        />
      </h3>
      <p className="pWarning">Attention : ne pas enregistrer de section vide</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="aboutMe">Section Qui suis-je :</label>
        <ReactQuill
          value={aboutText}
          onChange={setAboutText}
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
        <br />
        <label htmlFor="qualifications">
          Section Mes diplômes et formations :
        </label>
        <ReactQuill
          value={qualifText}
          onChange={setQualifText}
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
        <br />
        <label htmlFor="experiences">Section Mes expériences :</label>
        <ReactQuill
          value={xpText}
          onChange={setXpText}
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
        <br />

        <label htmlFor="fileUploader">Télécharger une nouvelle image :</label>
        <ImgUploader
          id="fileUploader"
          onUploadSuccess={handleImageUploadSuccess}
        />
        {aboutImgURL && (
          <div>
            <p>Image actuelle :</p>
            <img src={aboutImgURL} alt="Portrait" width="200" />
          </div>
        )}
        <div className="containButton">
          <button className="addButton" type="submit">
            Mettre à jour la page Présentation
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          La page Présentation a été mise à jour avec succès.
        </p>
      )}
    </div>
  );
}
