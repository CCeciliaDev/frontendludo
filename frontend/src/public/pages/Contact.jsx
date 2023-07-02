import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import doc from "../../assets/doc.png";
import "../styles/Contact.css";
import deco from "../../assets/arrow.png";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messText, setMessText] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitErrSuccess, setSubmitErrSuccess] = useState(false);
  // États pour les erreurs de validation
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const fetchContact = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contact`
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des contact : ", error);
    }
  };
  useEffect(() => {
    fetchContact();
  }, []);

  // Fonction pour vérifier la validité de l'e-mail
  const validateEmail = (emailValue) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(emailValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Réinitialiser les erreurs
    setNameError("");
    setEmailError("");
    setSubjectError("");
    setMessageError("");

    // Valider les champs du formulaire
    let isValid = true;
    if (!name.trim()) {
      setNameError("Veuillez fournir votre nom");
      isValid = false;
    } else if (name.length < 5) {
      setNameError("Le nom doit contenir au moins 5 caractères");
      isValid = false;
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError("Veuillez fournir une adresse e-mail valide");
      isValid = false;
    }

    if (!subject.trim()) {
      setSubjectError("Veuillez fournir un sujet");
      isValid = false;
    } else if (subject.length < 10) {
      setSubjectError("Le sujet doit contenir au moins 10 caractères");
      isValid = false;
    }

    if (!message.trim()) {
      setMessageError("Veuillez fournir un message");
      isValid = false;
    } else if (message.length < 50) {
      setMessageError("Le message doit contenir au moins 50 caractères");
      isValid = false;
    }

    if (!isValid) {
      return; // Arrêter la fonction si le formulaire n'est pas valide
    }

    // Configurer les données à envoyer via la requête POST
    const data = {
      name,
      email,
      subject,
      message,
      messageText: messText,
    };

    // Envoyer la requête POST à l'API du serveur
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/send-email`, data)
      .then((response) => {
        console.info(response);
        setSubmitSuccess(true);
        setSubmitErrSuccess(false); // réinitialiser l'erreur si l'envoi a réussi
      })
      .catch((error) => {
        console.info(error);
        setSubmitErrSuccess(true); // mettre à jour l'état d'erreur si l'envoi a échoué
      });

    // Réinitialiser le formulaire
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setMessText("");
  };

  return (
    <div className="mainDivContact">
      <div className="divPresContact">
        <div className="divTitleContact">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Prendre rendez-vous sur Doctolib</h2>
        </div>
        <div className="divBox divBoxDocto">
          <p className="infoDocto">
            J'accepte les nouveaux patients sur Doctolib.
          </p>
          <Link
            className="x"
            target="_blank"
            to="https://www.doctolib.fr/psychologue/eysines/ludovic-fournier"
          >
            <img className="imgDoctolib" src={doc} alt="logo doctolib" />
          </Link>
        </div>

        <div className="divTitleContact">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Me contacter directement</h2>
        </div>

        <div className="divBox divBoxDirect">
          <p className="contactInfo2">
            Par téléphone
            <BsTelephoneFill
              size={15}
              color="#4c897c"
              style={{ marginLeft: "1em" }}
            />
            {contacts.map((contact, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={index}> &#x0A;{contact.tel}</span>
            ))}
          </p>
          <p className="contactInfo3">
            Par mail
            <MdEmail size={15} color="#4c897c" style={{ marginLeft: "1em" }} />
            {contacts.map((contact, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={index}>&#x0A;{contact.email}</span>
            ))}
          </p>

          <p className="contactInfo1">
            Durant mes consultations, je ne prends pas d'appel.
            <br />
            Cependant, je répondrai à votre message par le moyen que vous avez
            choisi pour me contacter.
          </p>
        </div>

        <div className="divTitleContact">
          <img className="deco" src={deco} alt="deco galet" />
          <h2>Me contacter par formulaire</h2>
        </div>
        <div className="divFormContact">
          <h5>Tous les champs du formulaires sont obligatoires.</h5>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Votre nom :</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(""); // Réinitialiser l'erreur lors de la modification
              }}
            />
            {nameError && <p className="error-message">{nameError}</p>}

            <label htmlFor="email">Votre email :</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // Réinitialiser l'erreur lors de la modification
              }}
            />
            {emailError && <p className="error-message">{emailError}</p>}

            <label htmlFor="sujet">Sujet du message :</label>
            <input
              id="sujet"
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setSubjectError(""); // Réinitialiser l'erreur lors de la modification
              }}
            />
            {subjectError && <p className="error-message">{subjectError}</p>}

            <label htmlFor="message">Votre message :</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageError(""); // Réinitialiser l'erreur lors de la modification
              }}
            />
            {messageError && <p className="error-message">{messageError}</p>}

            {/* Honeypot */}
            <input
              id="messageText"
              type="text"
              value={messText}
              name="messageText"
              style={{ display: "none" }}
              onChange={(e) => setMessText(e.target.value)}
            />
            <div className="divButtonContact">
              <button type="submit">Envoyer mon message</button>
            </div>
          </form>

          {submitSuccess && (
            <p className="success-message">
              Votre message a été envoyé avec succès.
            </p>
          )}

          {submitErrSuccess && (
            <p className="error-message">
              Votre message n'a pas été envoyé en raison de certains contenus
              inappropriés tels que des liens hypertextes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
