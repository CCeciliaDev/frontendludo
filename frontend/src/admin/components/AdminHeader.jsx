import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Effacer les données de l'admin dans le local storage
    localStorage.removeItem("admin_token");
    localStorage.removeItem("role");

    // Rediriger vers la page de connexion admin ou la page d'accueil
    navigate("/");
    // history.push("/home");
  };

  return (
    <div className="AHeader">
      <p>Espace administration</p>
      <button type="submit" className="decoButton" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
}
