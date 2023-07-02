import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <p>Page introuvable</p>
      <Link to="/">
        <p>Retour à l'accueil</p>
      </Link>
    </div>
  );
}
