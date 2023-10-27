import { serieFactory } from "../factories/serieFactory.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";

const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
if (isElectron) {
} else {
  // Navigateur web
  const downloadContainer = document.getElementById('download-container');
  if (downloadContainer) {
      // Créez un élément d'image
      const imageElement = document.createElement('img');
      imageElement.src = 'assets/icons/download-app.png';
      imageElement.alt = 'Télécharger sur macOs';
      imageElement.width = 100;
      imageElement.height = 100;

      // Créez un lien de téléchargement
      const downloadLink = document.createElement('a');
      downloadLink.href = 'Stream-1.0.1.dmg.zip';
      downloadLink.download = 'Stream-1.0.1.dmg.zip'; // Nom du fichier à télécharger
      downloadLink.appendChild(imageElement);

      // Ajoutez le lien au conteneur
      downloadContainer.appendChild(downloadLink);
  }
}

// Génère le HTML pour chaque photographe
async function generateSerieHtml(series) {
  // Récupère l'élément de section qui contiendra les cartes du photographe
  const seriesSection = document.querySelector(".serie-section");

  // Parcours le tableau des photographes et création d'une carte pour chaque photographe
  series.forEach((serie) => {
    // Création d'un objet modèle photographe à partir des données
    const serieModel = serieFactory(serie);
    // Obtention de l'élément DOM pour la carte du photographe
    const userCardDOM = serieModel.getSerieCardDOM();
    // Ajoute la fiche à la section photographes
    seriesSection.appendChild(userCardDOM);
  });
}

// Récupère les données du photographe et restitue les cartes
async function renderSerieProfiles() {
  // Obtention des données pour les photographes
  const { series } = await fetchJsonData();
  // Generate the HTML for the serie cards
  generateSerieHtml(series);
}

// Rendu de tous les profils de photographe
renderSerieProfiles();