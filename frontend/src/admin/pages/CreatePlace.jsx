import { useState } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import ImgUploader from "../components/ImgUploader";
import createApiService from "../../services/RequestApi";

export default function CreatePlace() {
  const [newPlace, setNewPlace] = useState({
    placeName: "",
    address: "",
    CP: "00000",
    city: "",
    urlImg: "",
    time1: "",
    time2: "",
    time3: "",
  });
  const [addSuccess, setAddSuccess] = useState(false);
  const [picturePlace, setPicturePlace] = useState("");
  const apiService = createApiService();

  const handleNewPlaceChange = (e) => {
    setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
  };

  const handleNewPlaceSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/places`,
        newPlace
      );
      setAddSuccess(true);
      e.target.reset(); // Réinitialise le formulaire
      setNewPlace({
        placeName: "",
        address: "",
        CP: "00000",
        city: "",
        urlImg: "",
        time1: "",
        time2: "",
        time3: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du lieu : ", error);
    }
  };

  const handleImageUploadSuccess = (data) => {
    if (data.url) {
      setPicturePlace(data.url);
      setNewPlace({ ...newPlace, urlImg: data.url });
    } else {
      console.error(
        "Erreur lors de l'upload de l'image. La réponse ne contient pas d'URL."
      );
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Ajouter un lieu de consultation&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici créer un nouveau lieu de consultationn.&#x0A;Notez un ordre de priorité chiffré avant le nom du lieu.&#x0A;Attention, ajout possible d'une seule image par lieu."
        />
      </h3>
      <form onSubmit={handleNewPlaceSubmit}>
        <label htmlFor="newPlaceName">Nom du lieu :</label>
        <input
          id="newPlaceName"
          name="placeName"
          value={newPlace.placeName}
          onChange={handleNewPlaceChange}
        />

        <label htmlFor="newAddress">Adresse :</label>
        <input
          id="newAddress"
          name="address"
          value={newPlace.address}
          onChange={handleNewPlaceChange}
        />

        <label htmlFor="newCP">Code postal :</label>
        <input
          id="newCP"
          name="CP"
          value={newPlace.CP}
          onChange={handleNewPlaceChange}
        />

        <label htmlFor="newCity">Ville :</label>
        <input
          id="newCity"
          name="city"
          value={newPlace.city}
          onChange={handleNewPlaceChange}
        />

        <label htmlFor="newTime1">Horaires 1 :</label>
        <input
          id="newTime1"
          name="time1"
          value={newPlace.time1}
          onChange={handleNewPlaceChange}
        />

        <label htmlFor="newTime2">Horaires 2 :</label>
        <input
          id="newTime2"
          name="time2"
          value={newPlace.time2}
          onChange={handleNewPlaceChange}
        />

        <label htmlFor="newTime3">Horaires 3 :</label>
        <input
          id="newTime3"
          name="time3"
          value={newPlace.time3}
          onChange={handleNewPlaceChange}
        />

        <img
          className="previewImage"
          src={picturePlace}
          alt="Aperçu du lieu"
          style={{ display: picturePlace ? "block" : "none" }}
        />
        <label htmlFor="fileUploader">Télécharger une image :</label>
        <ImgUploader onUploadSuccess={handleImageUploadSuccess} />
        <div className="containButton">
          <button className="addButton" type="submit">
            Ajouter un lieu
          </button>
        </div>
        {addSuccess && (
          <p className="success-message">Le lieu a été ajouté avec succès.</p>
        )}
      </form>
    </div>
  );
}
