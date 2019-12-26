importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'); //import workbox libs

// cek workbox apakah berhasil dimuat
if (workbox) {
  console.log(`Workbox berhasil dimuat`);

} else {
  console.log(`Workbox gagal dimuat`);
}

//precaching 
workbox.precaching.precacheAndRoute([
  { url:   "/", revision: '1' },
  { url: "/nav.html", revision: '1' },
  { url: "/index.html", revision: '1' },
  { url: "/detailTeam.html", revision: '1' },
  { url: "/pages/home.html", revision: '1' },
  { url: "/pages/matches.html", revision: '1' },
  { url: "/pages/teams.html", revision: '1' },
  { url: "/pages/fav-teams.html", revision: '1' },
  { url: "/pages/fav-matches.html", revision: '1' },
  { url: "/css/materialize.min.css", revision: '1' },
  { url: "/component/detailStandingsById.js", revision: '1' },
  { url: "/component/matches.js", revision: '1' },
  { url: "/component/savedFavTeam.js", revision: '1' },
  { url: "/component/savedFavTeamById.js", revision: '1' },
  { url: "/component/savedMatches.js", revision: '1' },
  { url: "/component/standings.js", revision: '1' },
  { url: "/component/teams.js", revision: '1' },
  { url: "/js/materialize.min.js", revision: '1' },
  { url: "/js/materialize.js", revision: '1' },
  { url: "/js/nav.js", revision: '1' },
  { url: "/js/api.js", revision: '1' },
  { url: "/js/db.js", revision: '1' },
  { url: "/js/idb.js", revision: '1' },
  { url: "/js/main.js", revision: '1' },
  { url: "/js/main.js", revision: '1' },
  { url: "/js/detailTeamMain.js", revision: '1' },
  { url: "/js/convertTime.js", revision: '1' },
  { url: "/manifest.json", revision: '1' },
  { url: "/img/favicon.ico", revision: '1' },
  { url: "/img/icon.png", revision: '1' },
  { url: "/img/icon192.png", revision: '1' },
  { url: "/img/football.png", revision: '1' },
  { url: "/img/football.png", revision: '1' },
  { url: "/football.svg", revision: '1' }
])



self.addEventListener('push', function(event) {
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