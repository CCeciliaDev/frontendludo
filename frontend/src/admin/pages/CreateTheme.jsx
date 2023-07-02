import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import createApiService from "../../services/RequestApi";

export default function CreateTheme() {
  const [themes, setThemes] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newTheme, setNewTheme] = useState("");
  const apiService = createApiService();
  console.info("Nom du thème :", themes);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiService.get(
          `${import.meta.env.VITE_BACKEND_URL}/themes`
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
      await apiService.post(`${import.meta.env.VITE_BACKEND_URL}/themes`, {
        themesArticleName: newTheme,
      });
      setNewTheme("");
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la création du thème:", error);
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Ajouter un thème&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici ajouter de nouveaux thèmes afin de classer vos articles"
        />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTheme">Nom du thème :</label>
        <input
          id="newTheme"
          value={newTheme}
          onChange={(e) => setNewTheme(e.target.value)}
        />
        <div className="containButton">
          <button className="addButton" type="submit">
            Ajouter ce thème
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">Le thème a été créé avec succès.</p>
      )}
    </div>
  );
}
