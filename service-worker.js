importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'); //import workbox libs

// cek workbox apakah berhasil dimuat
if (workbox) {
  console.log(`Workbox berhasil dimuat`);

} else {
  console.log(`Workbox gagal dimuat`);
}

//precaching 
workbox.precaching.precacheAndRoute([
  { url: "/", revision: '1' },
  { url: "/nav.html", revision: '1' },
  { url: "/index.html", revision: '1' },
  { url: "/detailTeam.html", revision: '1' },
  { url: "/css/materialize.min.css", revision: '1' },
  { url: "/component/detailStandingsById.js", revision: '1' },
  { url: "/component/matches.js", revision: '1' },
  { url: "/component/savedFavTeam.js", revision: '1' },
  { url: "/component/savedFavTeamById.js", revision: '1' },
  { url: "/component/savedMatches.js", revision: '1' },
  { url: "/component/standings.js", revision: '1' },
  { url: "/component/teams.js", revision: '1' },
  { url: "/js/api.js", revision: '1' },
  { url: "/js/convertTime.js", revision: '1' },
  { url: "/js/db.js", revision: '1' },
  { url: "/js/detailTeamMain.js", revision: '1' },
  { url: "/js/idb.js", revision: '1' },
  { url: "/js/main.js", revision: '1' },
  { url: "/js/materialize.min.js", revision: '1' },
  { url: "/js/materialize.js", revision: '1' },
  { url: "/js/nav.js", revision: '1' },
  { url: "/football.svg", revision: '1' }
], { ignoreUrlParametersMatching: [/.*/]
}         
)

// save to cache pages
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

// save to cache with max entries 60 and max age 30 days
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
      ],
  })
);

// save to cache from api football
workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
)

// save to cache from google font
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
);

// save cache google font api with duration 1 years
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 30,
          }),
      ],
  })
);

// get all file with format *js from cache first
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);

// get materilize file from cache first
workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.cacheFirst()
);

// get all file with format *png from cache first
workbox.routing.registerRoute(
  new RegExp('.*\.png'),
  workbox.strategies.cacheFirst()
);

// set push notification
self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/football.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});