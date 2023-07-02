import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function UserGuard({ element }) {
  const token = localStorage.getItem("user_token");
  const userRole = localStorage.getItem("role");

  console.info("userRole :", userRole);
  // console.info("element :", element);

  if (!token || userRole !== "user") {
    // L'utilisateur n'a pas le rôle d'utilisateur ou le token est manquant,
    // il est redirigé vers une autre page
    return <Navigate to="/unauthorized" />;
  }

  // if (!token) {
  //   // L'utilisateur n'a pas le rôle d'utilisateur ou le token est manquant,
  //   // il est redirigé vers une autre page
  //   return <Navigate to="/unauthorized" />;
  // }

  // L'utilisateur a le rôle d'utilisateur et le token est présent,
  // permettez-lui d'accéder à la page
  return element;
}

UserGuard.propTypes = {
  element: PropTypes.element.isRequired,
};
