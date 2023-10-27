import { fetchJsonData } from "./fetchJsonData.js";

// Récupère les éléments multimédias d'un photographe à partir des données JSON par son identifiant
export async function getSerieMedia() {
  // Récupère le tableau multimédia à partir des données JSON
  const { media } = await fetchJsonData();
  // Récupère l'identifiant du photographe à partir des paramètres de l'URL
  const params = new URL(document.location).searchParams;
  const serieId = parseInt(params.get("id"));
  // Filtre le tableau multimédia pour renvoyer uniquement les éléments avec un identifiant de photographe correspondant
  return media.filter(
    (mediaItem) => mediaItem.serieId === serieId
  );
}