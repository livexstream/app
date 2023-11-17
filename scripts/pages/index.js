import { serieFactory } from "../factories/serieFactory.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";

const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
if (isElectron) {
} else {
  // Navigateur web
  const downloadContainer = document.getElementById('download-container');
  if (downloadContainer) {
      // Créez un élément d'image
      const imageElementMac = document.createElement('img');
      imageElementMac.src = 'assets/icons/download-app-mac.png';
      imageElementMac.alt = 'Télécharger sur macOs';
      imageElementMac.width = 100;
      imageElementMac.height = 100;

      const imageElementWindows = document.createElement('img');
      imageElementWindows.src = 'assets/icons/download-app-windows.png';
      imageElementWindows.alt = 'Télécharger sur windows';
      imageElementWindows.width = 100;
      imageElementWindows.height = 100;

      // Créez un lien de téléchargement
      const downloadLinkMac = document.createElement('a');
      downloadLinkMac.href = 'https://mega.nz/file/eEwCCAjK#0scaC9tJ9hfNhR-cqV1W-cB6aAwAuzAk1viLK6CbmVU';
      downloadLinkMac.appendChild(imageElementMac);

      const downloadLinkWindows = document.createElement('a');
      downloadLinkWindows.href = 'https://mega.nz/file/GVIkWRbJ#t5FC1Dp3rGTPsASmb2S6W6unAFW3bm58z4Urbv6MYJQ'
      downloadLinkWindows.appendChild(imageElementWindows);

      // Ajoutez le lien au conteneur
      downloadContainer.appendChild(downloadLinkMac);
      downloadContainer.appendChild(downloadLinkWindows);
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