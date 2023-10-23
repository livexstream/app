import { serieFactory } from "../factories/webHomeSerieFactory.js";
import { fetchJsonData } from "../utils/fetchJsonData.js";

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