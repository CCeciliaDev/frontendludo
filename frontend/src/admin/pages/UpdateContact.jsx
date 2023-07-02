import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import "../styles/Adminmodules.css";
import createApiService from "../../services/RequestApi";

export default function UpdateContact() {
  const [contact, setContact] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const apiService = createApiService();

  useEffect(() => {
    const fetchContact = () => {
      apiService
        .get(`${import.meta.env.VITE_BACKEND_URL}/contact`)
        .then((response) => {
          setContact(response.data[0]);
          // console.info("Contact data received:", response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des contacts : ",
            error
          );
        });
    };
    fetchContact();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService
      .put(`${import.meta.env.VITE_BACKEND_URL}/contact`, {
        tel: contact.tel,
        email: contact.email,
      })
      .then(() => {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
        }, 3000);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du contact : ", error);
      });
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  // console.info("Contact object:", contact);

  return (
    <div className="adminPage">
      <h3>
        Modification des moyens de contact&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier vos moyens de contact.&#x0A;Il est conseillé de saisir au moins un numéro de téléphone et un email."
        />
      </h3>
      <p className="pWarning">Attention : ne pas enregistrer de section vide</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="tel">Tel :</label>
        <input
          id="tel"
          name="tel"
          value={contact.tel || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">Email :</label>
        <input
          id="email"
          name="email"
          value={contact.email || ""}
          onChange={handleChange}
        />
        <div className="containButton">
          <button className="addButton" type="submit">
            Mettre à jour les contacts
          </button>
        </div>
      </form>
      {submitSuccess && (
        <p className="success-message">
          Les moyens de contact ont été mis à jour avec succès.
        </p>
      )}
    </div>
  );
}
