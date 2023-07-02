import { useState, useEffect } from "react";
// import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function UpdateAbout() {
  const [reasonText, setReasonText] = useState("");
  const [expertText, setExpertText] = useState("");
  const [consultText, setConsultText] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/consultation`
        );
        setReasonText(response.data.reason);
        setExpertText(response.data.expertise);
        setConsultText(response.data.consultation);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des textes consultation : ",
          error
        );
      }
    };
    fetchText();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.put(`${import.meta.env.VITE_BACKEND_URL}/consultation`, {
        reason: reasonText,
        expertise: expertText,
        consultation: consultText,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des textes consultation : ",
        error
      );
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modification de la page Consultations&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier les 3 sections de la page Consultations.&#x0A;Evitez de laisser une section vide car cela dégradera l'aspect&#x0A;et le contenu de votre page."
        />
      </h3>
      <p className="pWarning">Attention : ne pas enregistrer de section vide</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="reason">Section Pour quels motifs consulter :</label>
        <ReactQuill
          value={reasonText}
          onChange={setReasonText}
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
        <label htmlFor="expertise">Section Mes domaines d'expertise :</label>
        <ReactQuill
          value={expertText}
          onChange={setExpertText}
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
        <label htmlFor="consultation">
          Section Comment je mène mes consultations :
        </label>
        <ReactQuill
          value={consultText}
          onChange={setConsultText}
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
            Mettre à jour les textes
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          Les textes de la page Consultations ont été mis à jour avec succès.
        </p>
      )}
    </div>
  );
}
