var dbPromised = idb.open("footix-app", 1, function (upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("teams_fav")) {
    var indexTeamFav = upgradeDb.createObjectStore("teams_fav", { keyPath: "id" });
    indexTeamFav.createIndex("name", "name", { unique: false });
  }

  if (!upgradeDb.objectStoreNames.contains("match_fav")) {
    var indexMatchFav = upgradeDb.createObjectStore("match_fav", {
      keyPath: "id"
    });
    indexMatchFav.createIndex("homeTeam", "homeTeam", {
      unique: false
    });
    indexMatchFav.createIndex("awayTeam", "awayTeam", {
      unique: false
    });
  }

});

function saveTeamFav(data) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teams_fav", "readwrite");
      var store = tx.objectStore("teams_fav");
      console.log(data);
      store.put(data);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: `Team has been saved` })
    }).catch(err => {
      console.error('Team has not beend saved', err);
    });
}


function saveMatchFav(data) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("match_fav", "readwrite");
      var store = tx.objectStore("match_fav");
      console.log(data);
      store.put(data);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: `Match has been saved` })
    }).catch(err => {
      console.error('Match has not beend saved', err);
    });
}

function getAllTeam() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams_fav", "readonly");
        var store = tx.objectStore("teams_fav");
        return store.getAll();
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

function getAllMatch() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("match_fav", "readonly");
        var store = tx.objectStore("match_fav");
        return store.getAll();
      })
      .then(function (data) {
        resolve(data);
      });
  });
}