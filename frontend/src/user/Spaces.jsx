import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Spaces.css";

export default function Spaces() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idThemesDoc = queryParams.get("idThemesDoc");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/documentsbytheme/${idThemesDoc}`,
          { headers }
        );

        console.info("API Response data:", response.data);
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (idThemesDoc) {
      fetchDocuments();
    }
  }, [idThemesDoc]);

  const handleLogout = () => {
    // Effacer les données de l'admin dans le local storage
    localStorage.removeItem("user_token");
    localStorage.removeItem("role");

    // Rediriger vers la page de connexion admin ou la page d'accueil
    navigate("/");
    // history.push("/home");
  };

  return (
    <div className="mainDivSpaces">
      <div className="titleSpaces">
        Bienvenue dans votre espace documentaire
      </div>

      <div className="infoSpaces">
        Cliquez sur le document souhaité pour le télécharger
      </div>
      <div className="Doc">
        {documents.length > 0 ? (
          documents.map((subArray, index) =>
            subArray.map((document) => (
              <div key={document.id || index}>
                <a href={document.urlDoc}>{document.docName}</a>
              </div>
            ))
          )
        ) : (
          <p>Aucun document disponible.</p>
        )}
      </div>

      <button type="submit" className="userDecoButton" onClick={handleLogout}>
        Se déconnecter
      </button>
    </div>
  );
}
