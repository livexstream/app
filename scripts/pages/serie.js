import { mediaFactory } from "../factories/mediaFactory.js";
import { getSerieInfo } from "../utils/getSerieInfo.js";
import { getSerieMedia } from "../utils/getSerieMedia.js";
import { displayModal, closeModal } from "../utils/displayCloseModal.js";

// Récupère l'objet d'informations sur le photographe
const serieInfo = await getSerieInfo();

// Récupère le tableau multimédia du photographe
const serieMedia = await getSerieMedia();

// Initialise une variable qui contiendra l'identifiant multimédia actuel de la lightbox
let currentLightboxMediaId = 0;

function renderPhotographHeader(object) {
  // Déstructure l'objet info photographe à extraire pour extraire ses propriétés
  const { name, saison, country, tagline, portrait } = object;

  // Crée le code HTML pour la section d'en-tête
  const photographHeader = `
    <section class="photograph-header">
      <div class="photograph-info">
        <h1 class="photograph-name">${name}</h1>
        <p class="photograph-tagline">${tagline}</p>
      </div>
      <img class="photograph-img" src="assets/series/${portrait}" alt="Photo de ${name}">
    </section>
  `;//<p class="photograph-location">${saison}, ${country}</p>
  //<button class="button" id="contactBtn" aria-label="Bouton d'ouverture du modal de contact">Aide</button>

  // Ajoute le pied de page HTML à l'élément principal
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += photographHeader;
}

function renderDropdown() {
  // Crée le HTML pour le menu déroulant
  const dropdownHtml = `
    <select class="dropdown" id="dropdownMenu" aria-label="Menu de tri">
      <option class="dropdown-options" value=""> Trier par </option>
      <option class="dropdown-options" value="Popularité">Saison 1</option>
      <option class="dropdown-options" value="Date">Saison 2</option>
      <option class="dropdown-options" value="Titre">Saison 3</option>
    </select>
  `;

  // Ajoute le code HTML déroulant à l'élément principal
  const mainEl = document.querySelector("main");
  mainEl.innerHTML += dropdownHtml;
}

function renderMediaSection(array) {
  // Créez un nouvel élément div pour contenir les cartes multimédias
  const mediaSection = document.createElement("div");
  mediaSection.className = "media-section";

  // Ajoute la section média à l'élément principal
  const mainEl = document.querySelector("main");
  mainEl.append(mediaSection);

  // Parcours chaque élément multimédia du tableau
  array.forEach((media) => {
    // Crée un objet modèle de carte multimédia à partir du tableau multimédia
    const mediaCardModel = mediaFactory(media);
    // Obtention de l'élément DOM pour la carte multimédia
    const mediaCardDOM = mediaCardModel.getMediaCardDOM();
    // Ajoute la carte à la section média
    mediaSection.append(mediaCardDOM);
  });
}

//function renderPhotographFooter(object) {
  // Déstructure l'objet info photographe pour extraire le prix du photographe
  //const { info } = object;

  // Calcule le nombre total de likes médiatiques et le stocke dans une variable
  //const mediaLikeCount = document.querySelectorAll(".media-like-count");
  //let totalMediaLikeCount = 0;

  //mediaLikeCount.forEach((media) => {
    //totalMediaLikeCount += Number(media.textContent);
  //});

  // Crée le HTML pour la section de pied de page
  //const photographFooter = `
    //<aside class="footer">
      //<div class="footer-container">
        //<span class="footer-likes" id="totalLikesCount">${totalMediaLikeCount}</span>
        //<i class="fa-solid fa-heart"></i>
      //</div>
      //<p>${info}</p>
    //</aside>
  //`;

  // Ajout la section HTML de pied de page à l'élément de pied de page
  //const footerEl = document.querySelector("footer");
  //footerEl.innerHTML = photographFooter;
//}

function insertPhotographName(object) {
  // Déstructuration de l'objet d'information du photographe pour extraire la propriété name
  const { name } = object;

  // Ajoute le nom du photographe à l'élément modalTitle
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.innerHTML = `${name}`;
}

function validateModalForm(event) {
  // Empêche la soumission du formulaire par défaut
  event.preventDefault();

  // Récupère les éléments du formulaire modal et ses entrées
  const modalForm = document.getElementById("modalForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // Vérifie si les données d'entrée du formulaire sont valides et console.loge les données en tant qu'objet
  if (modalForm.checkValidity()) {
    console.log({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      message: message.value,
    });
    modalForm.reset();
    closeModal("contactModal");
  }
}

async function renderLightBoxMedia(mediaId) {
  // Récupère l'objet média pour l'identifiant média spécifié
  const mediaObject = await serieMedia.find(
    (media) => media.id == mediaId
  );

  // Met à jour la variable currentMediaId avec l'identifiant multimédia actuel de la lightbox
  currentLightboxMediaId = mediaId;

  // Déstructure l'objet média pour en extraire ses propriétés
  const { title, serieId, image, video } = mediaObject;

  // Obtiens l'élément lightboxMedia
  const lightboxMedia = document.getElementById("lightboxMedia");

  // Si le média est une image, ajoute le code HTML de la carte média approprié à l'élément lightboxMedia
  if (image) {
    lightboxMedia.innerHTML = `
      <img class="lightbox-img" src="assets/images/${serieId}/${image}" alt="${title}">
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }

  // Si le média est une vidéo, ajoute le code HTML de la carte média approprié à l'élément lightboxMedia
  if (video) {
    lightboxMedia.innerHTML = `
      <video class="lightbox-video" title="${title}" controls>
        <source src="assets/images/${serieId}/${video}" type="video/mp4">
      </video>
      <figcaption class="lightbox-caption">${title}</figcaption>
  `;
  }
}

function nextLightBoxMedia() {
  // Recherche l'index de l'élément multimédia actuel dans le tableau PhotographeMedia
  const currentIndex = serieMedia.findIndex(
    (media) => media.id == currentLightboxMediaId
  );

  // Si l'élément multimédia actuel n'est pas le dernier élément du tableau, affiche l'élément suivant
  if (currentIndex < serieMedia.length - 1) {
    const nextMediaId = serieMedia[currentIndex + 1].id;
    renderLightBoxMedia(nextMediaId);
    // Sinon, affiche le premier élément du tableau
  } else {
    const nextMediaId = serieMedia[0].id;
    renderLightBoxMedia(nextMediaId);
  }
}

function previousLightBoxMedia() {
  // Recherche l'index de l'élément multimédia actuel dans le tableau PhotographeMedia
  const currentIndex = serieMedia.findIndex(
    (media) => media.id == currentLightboxMediaId
  );

  // Si l'élément multimédia actuel n'est pas le premier élément du tableau, affiche l'élément précédent
  if (currentIndex > 0) {
    const previousMediaId = serieMedia[currentIndex - 1].id;
    renderLightBoxMedia(previousMediaId);
    // Sinon, affiche le dernier élément du tableau
  } else {
    const previousMediaId = serieMedia[serieMedia.length - 1].id;
    renderLightBoxMedia(previousMediaId);
  }
}

function renderLikes() {
  // Obtien le média comme élément span
  const mediaLikeSpanEl = this.parentNode.firstElementChild;

  // Obtien le média comme élément d'icône
  const mediaLikeIconEl = this.firstElementChild;

  if (mediaLikeIconEl.classList.contains("fa-regular")) {
    // Converti les médias comme le contenu span en un nombre et le stocke en tant que variable mediaLikeCount
    let mediaLikeCount = Number(mediaLikeSpanEl.textContent);

    // Incrémente la variable mediaLikeCount
    mediaLikeCount++;

    // Défini la valeur mediaLikeCount lorsque les médias aiment le nouveau contenu de l'élément étendu
    mediaLikeSpanEl.textContent = mediaLikeCount;

    // Affiche le pied de page du photographe pour recalculer le nombre total de likes
    //renderPhotographFooter(serieInfo);

    // Remplace la classe fa-regular par la classe fa-solid
    mediaLikeIconEl.classList.replace("fa-regular", "fa-solid");
  } else if (mediaLikeIconEl.classList.contains("fa-solid")) {
    // Converti les médias comme le contenu span en un nombre et le stock en tant que variable mediaLikeCount
    let mediaLikeCount = Number(mediaLikeSpanEl.textContent);

    // Diminue la variable mediaLikeCount
    mediaLikeCount--;

    // Défini la valeur mediaLikeCount lorsque les médias aiment le nouveau contenu de l'élément étendu
    mediaLikeSpanEl.textContent = mediaLikeCount;

    // Affiche le pied de page du photographe pour recalculer le nombre total de likes
    //renderPhotographFooter(serieInfo);

    // Remplace fa-solid par la classe fa-regular
    mediaLikeIconEl.classList.replace("fa-solid", "fa-regular");
  }
}

async function sortMediaSection() {
  // Récupère la valeur de l'option sélectionnée
  const selectedOption = this.value;

  // Trie le tableau PhotographeMedia à l'aide de la touche J'aime si l'option sélectionnée est "Popularité"
  if (selectedOption == "Popularité") {
    await serieMedia.sort((a, b) => {
      return b.likes - a.likes;
    });
  }

  // Trie le tableau PhotographeMedia à l'aide de la clé de date si l'option sélectionnée est "Date"
  if (selectedOption == "Date") {
    await serieMedia.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  // Trie le tableau PhotographeMedia à l'aide de la touche titre si l'option sélectionnée est "Titre"
  if (selectedOption == "Titre") {
    await serieMedia.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  // Supprime la section média existante
  const mediaSection = document.querySelector(".media-section");
  mediaSection.remove();

  // Affiche la section de l'article média à l'aide du tableau PhotographeMedia trié
  renderMediaSection(serieMedia);

  // Ajoute un écouteur d'événement à chaque bouton de la carte multimédia pour ouvrir la lightbox modale en un clic
  const mediaCardButtons = document.querySelectorAll(".media-card-button");
  mediaCardButtons.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      renderLightBoxMedia(mediaId);
      displayModal("lightboxModal");
    });
  });

  // Ajoute un écouteur d'événement à chaque bouton de type carte multimédia pour exécuter la fonction renderLikes en un clic
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });
}

function addEventListeners() {
  // Ajoute un écouteur d'événement au menu déroulant pour trier la section multimédia en cas de changement
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.addEventListener("change", sortMediaSection);

  // Ajoute un écouteur d'événement au bouton de contact pour ouvrir le modal de contact en un clic
  //const contactBtn = document.getElementById("contactBtn");
  //contactBtn.addEventListener("click", () => {
    //displayModal("contactModal");
  //});

  // Ajoute un écouteur d'événement au bouton de fermeture dans le modal pour fermer le modal de contact en cliquant sur
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  modalCloseBtn.addEventListener("click", () => {
    closeModal("contactModal");
  });

  // Ajoute un écouteur d'événement pour valider le formulaire modal de contact lors de la soumission
  const modalForm = document.getElementById("modalForm");
  modalForm.addEventListener("submit", validateModalForm);

  // Ajoute un écouteur d'événement à chaque bouton de la carte multimédia pour ouvrir la lightbox modale en un clic
  const mediaCardButtons = document.querySelectorAll(".media-card-button");
  mediaCardButtons.forEach((card) => {
    card.addEventListener("click", () => {
      const mediaId = card.parentElement.id;
      renderLightBoxMedia(mediaId);
      displayModal("lightboxModal");
    });
  });

  // Ajoute un écouteur d'événement à chaque bouton de type carte multimédia pour exécuter la fonction renderLikes en un clic
  const mediaCardLikeButtons = document.querySelectorAll(".media-like-button");
  mediaCardLikeButtons.forEach((button) => {
    button.addEventListener("click", renderLikes);
  });

  // Ajoute un écouteur d'événement au bouton de fermeture dans le modal lightbox pour fermer le modal au clic
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  lightboxCloseBtn.addEventListener("click", () => {
    closeModal("lightboxModal");
  });

  // Ajoute un écouteur d'événement au bouton précédent dans la lightbox modale pour passer au média précédent en un clic
  const previousBtn = document.getElementById("lightboxPreviousBtn");
  previousBtn.addEventListener("click", previousLightBoxMedia);

  // Ajoute un écouteur d'événement au bouton suivant dans la lightbox modale pour passer au média suivant en un clic
  const nextBtn = document.getElementById("lightboxNextBtn");
  nextBtn.addEventListener("click", nextLightBoxMedia);

  // Ajoute un écouteur d'événement à lightboxModal pour passer au média précédent/suivant en appuyant sur les touches fléchées gauche/droite
  document.addEventListener("keydown", (event) => {
    // Obtien l'élément lightboxModal
    const lightboxModal = document.getElementById("lightboxModal");

    // Si la lightbox Modal est ouverte et que la touche fléchée gauche est enfoncée, appel de la fonction previousLightBoxMedia
    if (lightboxModal.open && event.key === "ArrowLeft") {
      previousLightBoxMedia();
    }

    // Si lightboxModal est ouvert et que la touche fléchée droite est enfoncée, appel de la fonction nextLightBoxMedia
    if (lightboxModal.open && event.key === "ArrowRight") {
      nextLightBoxMedia();
    }
  });

  // Ajoute un écouteur d'événement au modal contact et lightbox pour fermer le modal en appuyant sur le bouton ESC
  document.addEventListener("keydown", (event) => {
    // Si lightboxModal est ouvert et que la touche ESC est enfoncée, appel de la fonction closeModal
    const lightboxModal = document.getElementById("lightboxModal");
    if (lightboxModal.open && event.key === "Escape") {
      closeModal("lightboxModal");
    }

    // Si contactModal est ouvert et que la touche ESC est enfoncée, appelez la fonction closeModal
    const contactModal = document.getElementById("contactModal");
    if (contactModal.open && event.key === "Escape") {
      closeModal("contactModal");
    }
  });
}

async function renderPhotographMediaPage() {
  // Affiche la section d'en-tête de la page avec le nom, l'emplacement, le slogan et le portrait du photographe
  await renderPhotographHeader(serieInfo);

  // Affiche le menu déroulant
  await renderDropdown();

  // Affiche la section média de la page avec des cartes pour chaque élément multimédia
  await renderMediaSection(serieMedia);

  // Affiche la section de pied de page de la page avec les goûts et la note du photographe
  //await renderPhotographFooter(serieInfo);

  // Insère le nom du photographe dans le titre modal
  await insertPhotographName(serieInfo);

  // Ajoute tous les écouteurs d'événements
  addEventListeners();
}

// Render the entire serie's media page with all its elements
renderPhotographMediaPage();