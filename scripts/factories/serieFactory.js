export function serieFactory(data) {
    // Déstructuration de l'objet de données pour extraire ses propriétés
    const { name, id, saison, country, tagline, info, portrait } = data;
  
    // Création du chemin pour l'image portrait
    const picture = `assets/series/${portrait}`;
  
    // Défini une fonction qui renverra un élément DOM pour la carte du photographe
    function getSerieCardDOM() {
      // Create an article element to contain the serie card
      const article = document.createElement("article");
      article.className += "serie-card";
  
      // Crée un élément de lien pointant vers le portfolio du photographe
      const serieCardLink = document.createElement("a");
      serieCardLink.className += "serie-card-link";
      serieCardLink.setAttribute("href", `serie.html?id=${id}`);
      serieCardLink.setAttribute(
        "aria-label",
        `Lien vers le portfolio de ${name}`
      );
  
      // Crée un élément d'image pour le portrait du photographe
      const serieImg = document.createElement("img");
      serieImg.className += "serie-img";
      serieImg.setAttribute("src", picture);
      serieImg.setAttribute("alt", `Photo de ${name}`);
  
      // Crée un élément de titre pour le nom du photographe
      const serieName = document.createElement("h2");
      serieName.className += "serie-name";
      serieName.textContent = name;
  
      // Crée un élément de paragraphe pour l'emplacement
      const serieLocation = document.createElement("p");
      serieLocation.className += "serie-location";
      serieLocation.textContent = `${saison}`;//, ${country}
  
      // Crée un élément de paragraphe pour le slogan
      //const serieTagline = document.createElement("p");
      //serieTagline.className += "serie-tagline";
      //serieTagline.textContent = tagline;
  
      // Crée un élément de paragraphe pour le tarif
      const serieRate = document.createElement("p");
      serieRate.className += "serie-rate";
      serieRate.textContent = `${info}`;
  
      // Ajoute l'image et le titre à l'élément de lien
      serieCardLink.appendChild(serieImg);
      serieCardLink.appendChild(serieName);
  
      // Ajoute le lien, l'emplacement, le slogan et le tarif à l'élément article
      article.appendChild(serieCardLink);
      article.appendChild(serieLocation);
      //article.appendChild(serieTagline);
      article.appendChild(serieRate);
  
      // Renvoie l'élément article
      return article;
    }
  
    // Renvoi un objet avec les propriétés de nom et d'image et la fonction getSerieCardDOM
    return { name, picture, getSerieCardDOM };
  }