import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function AuthGuard({ element }) {
  const token = localStorage.getItem("admin_token");
  const adminRole = localStorage.getItem("role");

  console.info("adminRole :", adminRole);
  // console.info("element :", element);

  if (!token || adminRole !== "admin") {
    // L'utilisateur n'a pas le rôle d'administrateur ou le token est manquant,
    // il est redirigé vers une autre page
    return <Navigate to="/unauthorized" />;
  }

  // L'utilisateur a le rôle d'administration, permettez-lui d'accéder à la page
  return element;
}

AuthGuard.propTypes = {
  element: PropTypes.element.isRequired,
};
