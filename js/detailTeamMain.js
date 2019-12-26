// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function () {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function () {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var btnSave = document.getElementById("save");
    if (isFromSaved) {
      // Hide fab jika dimuat dari indexed db
      btnSave.style.display = 'none';

      // ambil artikel lalu tampilkan
      getSavedTeamById();
    } else {
      var item = getDetailStandingsById();
    }
    btnSave.onclick = function () {
      console.log("Tombol FAB di klik.");
      item.then(function (data) {
        saveTeamFav(data);
      });
    };
  });