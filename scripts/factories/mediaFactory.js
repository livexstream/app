export function mediaFactory(data) {
  const { id, serieId, title, image, url, video, likes } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.className += "media-card";
    article.id = id;

    const isElectron = navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;

    if (isElectron && video) {
      article.innerHTML = `
        <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
          <video class="media-card-video" title="${title}" poster="assets/images/${serieId}/${image}">
            <source src="assets/images/${serieId}/${video}" type="video/mp4">
          </video>
        </button>
        <section class "media-card-info">
          <h2 class="media-card-title">${title}</h2>
          <div class="media-like-container">
            <span class="media-like-count">${likes}</span>
            <button class="media-like-button" aria-label="Bouton de likes">
              <i class="media-like-logo fa-eye fa-regular"></i>
            </button>
          </div>
        </section>
      `;
    } else {
      article.innerHTML = `
        <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
          <a href="${url}" target="blank">
            <img class="media-card-img" src="assets/images/${serieId}/${image}" alt="${title}">
          </a>
        </button>
        <section class="media-card-info">
          <h2 class="media-card-title">${title}</h2>
          <div class="media-like-container style="display: flex;">
            <span class="media-like-count">${likes}</span>
            <button class="media-like-button" aria-label="Bouton de likes">
              <i class="media-like-logo fa-eye fa-regular"></i>
            </button>
          </div>
        </section>
      `;
    }

    return article;
  }

  return { getMediaCardDOM };
}

    /* Version antérieur : 
   export function mediaFactory(data) {
    // Déstructure l'objet de données pour extraire ses propriétés
    const { id, serieId, title, image, video, likes } = data;
  
    // Défini une fonction qui renverra un élément DOM pour la carte multimédia
    function getMediaCardDOM() {
      // Crée un élément d'article pour contenir la carte multimédia
      const article = document.createElement("article");
      article.className += "media-card";
      article.id = id;
  
      // Si le média est une image, ajoute le code HTML de la carte média approprié à l'élément article 
      if (image) {
        article.innerHTML = `
        <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
          <img class="media-card-img" src="assets/images/${serieId}/${image}" alt="${title}">
        </button>
        <section class="media-card-info">
          <h2 class="media-card-title">${title}</h2>
          <div class="media-like-container">
            <span class="media-like-count">${likes}</span>
            <button class="media-like-button" aria-label="Bouton de likes">
              <i class="media-like-logo fa-eye fa-regular"></i>
            </button>
          </div>
        </section>
      `;
      }
  
      // Si le média est une vidéo, ajoute le code HTML de la carte média approprié à l'élément article
      if (video) {
        article.innerHTML = `
        <button class="media-card-button" aria-label="Bouton d'ouverture de lightbox">
          <video class="media-card-video" title="${title}">
            <source src="assets/images/${serieId}/${video}" type="video/mp4">
          </video>
        </button>
        <section class="media-card-info">
          <h2 class="media-card-title">${title}</h2>
          <div class="media-like-container">
            <span class="media-like-count">${likes}</span>
            <button class="media-like-button" aria-label="Bouton de likes">
            <i class="media-like-logo fa-heart fa-regular"></i>
            </button>
          </div>
        </section>
      `;
      }
  
      // Renvoie l'élément article
      return article;
    }
  
    // Renvoi un objet avec la fonction getMediaCardDOM
    return { getMediaCardDOM };
  }
*/
