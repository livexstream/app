import { fetchJsonData } from "./fetchJsonData.js";

// Récupère les informations d'un photographe à partir des données JSON par son identifiant
export async function getSerieInfo() {
  // Récupère l'objet photographe à partir des données JSON
  const { series } = await fetchJsonData();
  // Récupère l'identifiant du photographe à partir des paramètres de l'URL
  const params = new URL(document.location).searchParams;
  const serieId = parseInt(params.get("id"));
  // Recherche l'objet photographe dans le tableau photographes avec l'identifiant correspondant
  return series.find(
    (serie) => serie.id === serieId
  );
}