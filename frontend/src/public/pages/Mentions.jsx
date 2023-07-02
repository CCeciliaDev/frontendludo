import { Link } from "react-router-dom";
import "../styles/Mentions.css";

export default function Mentions() {
  return (
    <div className="mainDivML">
      <div className="divML">
        <h3>Mentions légales</h3>
        <h4>Directeur de la publication</h4>
        <p>Ludovic Fournier</p>
        <p>Raison sociale : Ludovic Fournier EI</p>
        <p>Tel : 0766085621</p>
        <p>Email : ludovic.fournier.psychologue@gmail.fr</p>
        <p>Site web : http://www.ludovicfournier.fr/</p>
        <p>N° Siret : 52427344800026</p>
        <p>N° Adeli* : 339330763</p>
        <p>
          <em>
            * Le numéro ADELI permet d’identifier les professionnels de santé et
            leur donne le droit d’exercer. Ce numéro est un gage de securité
            pour les usagers.
          </em>
        </p>

        <h4>Politique de confidentialité</h4>
        <p>
          Ludovic Fournier ne collecte ni n’enregistre aucune donnée à caractère
          personnel via son site Internet, hormis les informations fournies via
          le formulaire de contact.
          <br />
          Ces données seront conservées au maximum 1 an.
        </p>

        <h4>Droits de propriété intellectuelle</h4>
        <p>
          Les informations textes, logos, infographies, dessins, illustrations
          fournies sur le site http://www.nomdedomaine.fr/, ne peuvent être
          totalement ou partiellement copiés, reproduits, cédés ou distribués,
          car bénéficiant de la protection au titre du droit de la propriété
          intellectuelle et notamment du droit d’auteur. La structure générale,
          ainsi que les logiciels, textes, son savoir-faire, illustrations et
          tout autre élément composant le site sont la propriété de Ludovic
          Fournier.
          <br />
          <br />
          Dans le cas où vous souhaiteriez partager du contenu présent sur ce
          site Internet, il sera nécessaire d'obtenir l'autorisation de l'auteur
          et/ou à minima de mentionner l'auteur et d'ajouter le lien vers le
          site.
        </p>

        <h4>Création site web et graphismes</h4>
        <p>Cécilia Caillaud - Cweb Créations</p>
        <p>
          Site web :&#x0A;
          <Link to="https://www.cwebcreations.fr" target="_blank">
            https://www.cwebcreations.fr/
          </Link>
        </p>

        <h4>Hébergeur</h4>
        <p>
          Ce site est hébergé par Hostinger, dont le siège social est situé
          HOSTINGER INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca,
          Chypre,
          <br /> joignable par le moyen suivant :&#x0A;
          <Link to="https://www.hostinger.fr/contact" target="_blank">
            https://www.hostinger.fr/contact
          </Link>
          .
        </p>
        <br />
      </div>
    </div>
  );
}
