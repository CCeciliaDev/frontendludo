import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import "../styles/Admin.css";

export default function SideAdmin() {
  // const [showThemes, setShowThemes] = useState(false);
  // const [showArticles, setShowArticles] = useState(false);
  // const [showThDoc, setShowThDoc] = useState(false);
  // const [showDocu, setShowDocu] = useState(false);
  // const [showPassWord, setShowPassWord] = useState(false);
  // const [showAdminG, setShowAdminG] = useState(false);
  const [menuState, setMenuState] = useState({
    showThemes: false,
    showArticles: false,
    showArticlesArchived: false,
    showThDoc: false,
    showDocu: false,
    showPassWord: false,
    showAdminG: false,
  });

  const toggleSubMenu = (key) => {
    setMenuState((prevState) => ({
      ...Object.keys(prevState).reduce((acc, k) => {
        acc[k] = k === key ? !prevState[k] : false;
        return acc;
      }, {}),
    }));
  };

  return (
    <div className="sideMenu">
      <div className="title">Les articles</div>
      <button type="button" onClick={() => toggleSubMenu("showThemes")}>
        {menuState.showThemes ? (
          <BsFillCaretDownFill size={13} color="#5394A5" />
        ) : (
          <BsFillCaretRightFill size={13} color="#004033" />
        )}
        Gérer les thèmes des articles
      </button>
      {menuState.showThemes && (
        <div>
          <NavLink to="/admin/reTheme">
            <p>Liste des thèmes</p>
          </NavLink>
          <NavLink to="/admin/upTheme">
            <p>Modifier les thèmes</p>
          </NavLink>
          <NavLink to="/admin/crTheme">
            <p>Ajouter un thème</p>
          </NavLink>
          <NavLink to="/admin/deTheme">
            <p>Supprimer un thème</p>
          </NavLink>
        </div>
      )}
      <button type="button" onClick={() => toggleSubMenu("showArticles")}>
        {menuState.showArticles ? (
          <BsFillCaretDownFill size={13} color="#5394A5" />
        ) : (
          <BsFillCaretRightFill size={13} color="#004033" />
        )}
        Gérer les articles publiés
      </button>
      {menuState.showArticles && (
        <div>
          <NavLink to="/admin/reArticle">
            <p>Liste des articles</p>
          </NavLink>
          <NavLink to="/admin/upArticle">
            <p>Modifier les articles</p>
          </NavLink>
          <NavLink to="/admin/crArticle">
            <p>Ajouter un article</p>
          </NavLink>
          <NavLink to="/admin/deArticle">
            <p>Supprimer un article</p>
          </NavLink>
        </div>
      )}
      <button
        type="button"
        onClick={() => toggleSubMenu("showArticlesArchived")}
      >
        {menuState.showArticlesArchived ? (
          <BsFillCaretDownFill size={13} color="#5394A5" />
        ) : (
          <BsFillCaretRightFill size={13} color="#004033" />
        )}
        Gérer les articles archivés
      </button>
      {menuState.showArticlesArchived && (
        <div>
          <NavLink to="/admin/reArticleArchi">
            <p>Liste des articles archivés</p>
          </NavLink>
          <NavLink to="/admin/upArticleArchi">
            <p>Modifier les articles archivés</p>
          </NavLink>
          <NavLink to="/admin/deArticleArchi">
            <p>Supprimer un article archivé</p>
          </NavLink>
        </div>
      )}
      <div className="title">Les espaces patients</div>
      <button type="button" onClick={() => toggleSubMenu("showThDoc")}>
        {menuState.showThDoc ? (
          <BsFillCaretDownFill size={13} color="#5394A5" />
        ) : (
          <BsFillCaretRightFill size={13} color="#004033" />
        )}
        Gérer les espaces documentaires
      </button>
      {menuState.showThDoc && (
        <div>
          <NavLink to="/admin/reThDoc">
            <p>Liste des espaces documentaires</p>
          </NavLink>
          <NavLink to="/admin/upThDoc">
            <p>Modifier les espaces documentaires</p>
          </NavLink>
          <NavLink to="/admin/crThDoc">
            <p>Ajouter un espace documentaire</p>
          </NavLink>
          <NavLink to="/admin/deThDoc">
            <p>Supprimer un espace documentaire</p>
          </NavLink>
        </div>
      )}
      <button type="button" onClick={() => toggleSubMenu("showDocu")}>
        {menuState.showDocu ? (
          <BsFillCaretDownFill size={13} color="#5394A5" />
        ) : (
          <BsFillCaretRightFill size={13} color="#004033" />
        )}
        Gérer les documents
      </button>
      {menuState.showDocu && (
        <div>
          <NavLink to="/admin/reDocu">
            <p>Liste des documents</p>
          </NavLink>
          <NavLink to="/admin/upDocu">
            <p>Modifier les documents</p>
          </NavLink>
          <NavLink to="/admin/crDocu">
            <p>Ajouter des documents</p>
          </NavLink>
          <NavLink to="/admin/deDocu">
            <p>Supprimer des documents</p>
          </NavLink>
        </div>
      )}
      <button type="button" onClick={() => toggleSubMenu("showPassWord")}>
        {menuState.showPassWord ? (
          <BsFillCaretDownFill size={13} color="#5394A5" />
        ) : (
          <BsFillCaretRightFill size={13} color="#004033" />
        )}
        Gérer les mots de passe
      </button>
      {menuState.showPassWord && (
        <div>
          <NavLink to="/admin/rePassW">
            <p>Liste des mots de passe</p>
          </NavLink>
          <NavLink to="/admin/upPassW">
            <p>Modifier les mots de passe</p>
          </NavLink>
          <NavLink to="/admin/crPassW">
            <p>Ajouter des mots de passe</p>
          </NavLink>
          <NavLink to="/admin/dePassW">
            <p>Supprimer des mots de passe</p>
          </NavLink>
        </div>
      )}
      <div className="title">Les informations du site</div>
      <button type="button" onClick={() => toggleSubMenu("showAdminG")}>
        {menuState.showAdminG ? (
          <BsFillCaretDownFill size={13} color="#5394A5" />
        ) : (
          <BsFillCaretRightFill size={13} color="#004033" />
        )}
        Gérer le contenu général
      </button>
      {menuState.showAdminG && (
        <div>
          <NavLink to="/admin/upWelcome">
            <p>Modifier le message d'accueil</p>
          </NavLink>
          <NavLink to="/admin/upAbout">
            <p>Modifier la page Présentation</p>
          </NavLink>
          <NavLink to="/admin/upConsult">
            <p>Modifier la page Consultations</p>
          </NavLink>
          <NavLink to="/admin/upPlace">
            <p>Modifier les lieux de consultation</p>
          </NavLink>
          <NavLink to="/admin/crPlace">
            <p>Ajouter un lieu de consultation</p>
          </NavLink>
          <NavLink to="/admin/upPrices">
            <p>Modifier les tarifs</p>
          </NavLink>
          <NavLink to="/admin/upContact">
            <p>Modifier les données de contact</p>
          </NavLink>
        </div>
      )}
    </div>
  );
}
