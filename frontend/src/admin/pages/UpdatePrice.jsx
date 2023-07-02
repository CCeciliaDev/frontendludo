import { useState, useEffect } from "react";
// import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import "../styles/Adminmodules.css";
import createApiService from "../../services/RequestApi";

export default function UpdatePrice() {
  const [prices, setPrices] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newPrice, setNewPrice] = useState({ consultationType: "", price: "" });
  const [addSuccess, setAddSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const apiService = createApiService();

  const fetchPrices = async () => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/prices`
      );
      setPrices(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des prix : ", error);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleChange = (e, id) => {
    const updatedPrices = prices.map((price) => {
      if (price.id === id) {
        return { ...price, [e.target.name]: e.target.value };
      }
      return price;
    });
    setPrices(updatedPrices);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const priceToUpdate = prices.find((price) => price.id === id);

    try {
      await apiService.put(`${import.meta.env.VITE_BACKEND_URL}/prices/${id}`, {
        consultationType: priceToUpdate.consultationType,
        price: priceToUpdate.price,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du prix : ", error);
    }
  };

  // Ajout de tarif
  const handleNewPriceChange = (e) => {
    setNewPrice({ ...newPrice, [e.target.name]: e.target.value });
  };

  // soumission formulaire ajout de tarif
  const handleNewPriceSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/prices`,
        newPrice
      );
      // Recharger les prix après l'ajout d'un nouveau tarif
      fetchPrices();
      setAddSuccess(true);
      setTimeout(() => {
        setAddSuccess(false); // Réinitialise submitSuccess après un délai de 3 secondes
      }, 3000); // Ajoutez cette ligne pour mettre à jour l'état addSuccess
    } catch (error) {
      console.error("Erreur lors de l'ajout du tarif : ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.delete(
        `${import.meta.env.VITE_BACKEND_URL}/prices/${id}`
      );
      fetchPrices();
    } catch (error) {
      console.error("Erreur lors de la suppression du prix : ", error);
      console.info(deleteSuccess);
    }
    setDeleteSuccess(true);
  };

  const openDeleteConfirm = (id) => {
    setIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmedDelete = () => {
    handleDelete(idToDelete);
    setShowConfirmation(false);
  };
  return (
    <div className="adminPage">
      <h3>
        Modification des prix&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici modifier les types de consultation et/ou les tarifs."
        />
      </h3>
      <table>
        <thead>
          <tr>
            <th>Type de consultation</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.id}>
              <td>
                <input
                  name="consultationType"
                  value={price.consultationType || ""}
                  onChange={(e) => handleChange(e, price.id)}
                />
              </td>
              <td>
                <input
                  name="price"
                  value={price.price || ""}
                  onChange={(e) => handleChange(e, price.id)}
                />
              </td>
              <td>
                <button
                  className="addButton2"
                  type="button"
                  onClick={(e) => handleSubmit(e, price.id)}
                >
                  Mettre à jour
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {submitSuccess && (
        <p className="success-message">Le prix a été mis à jour avec succès.</p>
      )}

      <form onSubmit={handleNewPriceSubmit}>
        <h3>
          Ajouter un tarif&#x20;
          <FaInfoCircle
            size={16}
            title="Vous pouvez ici ajouter un ou plusieurs types de consultation et leurs tarifs."
          />
        </h3>
        <label htmlFor="newConsultationType">Type de consultation :</label>
        <input
          id="newConsultationType"
          name="consultationType"
          value={newPrice.consultationType}
          onChange={handleNewPriceChange}
        />

        <label htmlFor="newPrice">Tarif :</label>
        <input
          id="newPrice"
          name="price"
          type="number"
          value={newPrice.price}
          onChange={handleNewPriceChange}
        />

        <button className="addButton" type="submit">
          Ajouter un tarif
        </button>
        {addSuccess && (
          <p className="success-message">Le tarif a été ajouté avec succès.</p>
        )}
      </form>

      <h3>
        Supprimer un tarif&#x20;
        <FaInfoCircle
          size={16}
          title="Vous pouvez ici supprimer un ou plusieurs types de consultation et leurs tarifs."
        />
      </h3>
      <table>
        <thead>
          <tr>
            <th>Type de consultation</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.id}>
              <td>{price.consultationType}</td>
              <td>{price.price}</td>
              <td>
                <button
                  className="addButton"
                  type="button"
                  onClick={() => openDeleteConfirm(price.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmation && (
        <div className="containButton confirmation-message">
          <p>Êtes-vous sûr de vouloir supprimer le tarif sélectionné ?</p>
          <button
            className="suppButton"
            type="button"
            onClick={handleConfirmedDelete}
          >
            Confirmer
          </button>
          <button
            className="annulButton"
            type="button"
            onClick={() => setShowConfirmation(false)}
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}
