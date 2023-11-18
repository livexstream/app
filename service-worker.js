// Ce code  gère les opérations hors ligne et la mise en cache.
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('my-cache').then(cache => {
        return cache.addAll([
          '/index.html', 
          '/serie.html',
          '/css/style.css',
          '/css/home.css',
          '/css/serie.css',
          '/css/media.css',
          '/css/modal.css',
          '/css/lightbox.css',
          '/scripts/factories/mediaFactory.js',
          '/scripts/factories/serieFactory.js',
          '/scripts/pages/index.js',
          '/scripts/pages/serie.js',
          '/scripts/utils/displayCloseModal.js',
          '/scripts/utils/fetchJsonData.js',
          '/scripts/utils/getSerieInfo.js',
          '/scripts/utils/getSerieMedia.js',
        ]); // Liste des fichiers à mettre en cache
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  