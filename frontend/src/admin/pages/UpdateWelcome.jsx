import { useState, useEffect } from "react";
// import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function UpdateWelcome() {
  const [welText, setWelText] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/welcome`
        );
        setWelText(response.data.welcomeText);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du texte d'accueil : ",
          error
        );
      }
    };
    fetchText();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.put(`${import.meta.env.VITE_BACKEND_URL}/welcome`, {
        welcomeText: welText,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du texte d'accueil : ",
        error
      );
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modification du message d'accueil&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier le message d'accueil de votre site."
        />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="welcomeText">Texte d'accueil :</label>
        <ReactQuill
          value={welText}
          onChange={setWelText}
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
        <div className="containButton">
          <button className="addButton" type="submit">
            Mettre à jour le texte d'accueil
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          Le texte d'accueil a été mis à jour avec succès.
        </p>
      )}
    </div>
  );
}
