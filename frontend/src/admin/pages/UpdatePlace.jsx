import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import ImgUploader from "../components/ImgUploader";
import "../styles/Adminmodules.css";
import createApiService from "../../services/RequestApi";

export default function UpdatePlace() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showPlaceDeleteConfirmation, setShowPlaceDeleteConfirmation] =
    useState(false);
  const apiService = createApiService();

  const fetchPlaces = async () => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/places`
      );
      setPlaces(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux : ", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [deleteSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlace) return;

    try {
      await apiService.put(
        `${import.meta.env.VITE_BACKEND_URL}/places/${selectedPlace.id}`,
        selectedPlace
      );
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du lieu : ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiService.delete(
        `${import.meta.env.VITE_BACKEND_URL}/places/${selectedPlace.id}`
      );
      setDeleteSuccess(true);
      setShowPlaceDeleteConfirmation(false);
      setSelectedPlace(null);
      fetchPlaces();
    } catch (error) {
      console.error("Erreur lors de la suppression du lieu : ", error);
    }
  };

  const handleImageUploadSuccess = (data) => {
    if (data.url) {
      setSelectedPlace((prevState) => ({
        ...prevState,
        urlImg: data.url,
      }));
    } else {
      console.error(
        "Erreur lors de l'upload de l'image. La réponse ne contient pas d'URL."
      );
    }
  };

  return (
    <div className="adminPage">
      <h3>
        Modification des lieux de consultation&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier un ou plusieurs lieux de consultation.&#x0A;Notez un ordre de priorité chiffré avant le nom du lieu.&#x0A;Attention, ajout possible d'une seule image par lieu."
        />
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Place-selection">Sélectionner un lieu :</label>
        <select
          id="Place-selection"
          value={selectedPlace?.id || ""}
          onChange={(e) => {
            const foundPlace = places.find(
              (place) => place.id === Number(e.target.value)
            );
            if (foundPlace) {
              setSelectedPlace(foundPlace);
            }
          }}
        >
          <option value="">Choisir un lieu</option>
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.placeName}
            </option>
          ))}
        </select>
        {selectedPlace && (
          <>
            <label htmlFor="placeName">Nom du lieu :</label>
            <input
              id="placeName"
              value={selectedPlace.placeName}
              onChange={(e) =>
                setSelectedPlace({
                  ...selectedPlace,
                  placeName: e.target.value,
                })
              }
            />

            <label htmlFor="address">Adresse :</label>
            <input
              id="address"
              value={selectedPlace.address}
              onChange={(e) =>
                setSelectedPlace({ ...selectedPlace, address: e.target.value })
              }
            />
            <label htmlFor="CP">Code postal :</label>
            <input
              id="CP"
              value={selectedPlace.CP}
              onChange={(e) =>
                setSelectedPlace({ ...selectedPlace, CP: e.target.value })
              }
            />
            <label htmlFor="city">Ville :</label>
            <input
              id="city"
              value={selectedPlace.city}
              onChange={(e) =>
                setSelectedPlace({ ...selectedPlace, city: e.target.value })
              }
            />
            <label htmlFor="time1">Horaires 1 :</label>
            <input
              id="time1"
              value={selectedPlace.time1}
              onChange={(e) =>
                setSelectedPlace({ ...selectedPlace, time1: e.target.value })
              }
            />
            <label htmlFor="time2">Horaires 2 :</label>
            <input
              id="time2"
              value={selectedPlace.time2}
              onChange={(e) =>
                setSelectedPlace({ ...selectedPlace, time2: e.target.value })
              }
            />
            <label htmlFor="time3">Horaires 3 :</label>
            <input
              id="time3"
              value={selectedPlace.time3}
              onChange={(e) =>
                setSelectedPlace({ ...selectedPlace, time3: e.target.value })
              }
            />
            <label htmlFor="fileUploader">
              Télécharger une nouvelle image :
            </label>
            <ImgUploader
              id="fileUploader"
              onUploadSuccess={handleImageUploadSuccess}
            />
          </>
        )}
        {selectedPlace?.urlImg && (
          <div>
            <p>Image actuelle :</p>
            <img src={selectedPlace.urlImg} alt="Aperçu du lieu" width="200" />
          </div>
        )}
        <div className="containButton">
          <button className="addButton" type="submit">
            Mettre à jour ce lieu
          </button>
        </div>
      </form>
      {selectedPlace && (
        <div className="containButton">
          <button
            className="suppButton"
            type="button"
            onClick={() => setShowPlaceDeleteConfirmation(true)}
          >
            Supprimer ce lieu
          </button>
          {showPlaceDeleteConfirmation && (
            <>
              <p>Êtes-vous sûr de vouloir supprimer ce lieu ?</p>
              <button
                className="suppButton"
                type="button"
                onClick={handleDelete}
              >
                Confirmer
              </button>
              <button
                className="annulButton"
                type="button"
                onClick={() => setShowPlaceDeleteConfirmation(false)}
              >
                Annuler
              </button>
            </>
          )}
        </div>
      )}

      {submitSuccess && (
        <p className="success-message">Le lieu a été mis à jour avec succès.</p>
      )}
    </div>
  );
}
