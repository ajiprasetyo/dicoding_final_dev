const API_KEY = 'd2e0a30d3ce24299b3c13af674c54ad7'
const LEAGUE_ID = 2021
const base_url = "https://api.football-data.org/v2/";
const standing_endpoint = `${base_url}competitions/${LEAGUE_ID}/standings?standingType=TOTAL`
const match_upcoming_endpoint = `${base_url}competitions/${LEAGUE_ID}/matches?status=SCHEDULED`
const teams_endpoint = `${base_url}teams/`

var teamData;
var matchData;
var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  });
}

//Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    //Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    //Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

//Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

//Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  //Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

//Blok kode untuk melakukan request data json standings
function getStandings() {
  // Blok kode mengambil data dari cache jika tersedia
  if ("caches" in window) {
    caches.match(standing_endpoint).then(function (response) {
      if (response) {
        response.json()
          .then(function (data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card standings secara dinamis
            standings(data);
          });
      }
    });
  }

  fetchApi(standing_endpoint)
    .then(status)
    .then(json)
    .then(function (data) {
      standings(data);
    })
    .catch(error);
}

//Blok kode untuk melakukan request data json team
function getDetailStandingsById() {
  return new Promise(function (resolve, reject) {

    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(teams_endpoint + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // console.log("cek logo detail tim : " + data.crestUrl)
            detailStandingsById(data);
            resolve(data);

          });
        }
      });
    }

    fetchApi(teams_endpoint + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        detailStandingsById(data);
        resolve(data);

      });
  });
}

function getMatches() {
  
  if ('caches' in window) {
    caches.match(match_upcoming_endpoint).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          matches(data);
          
        });
      }
    });
  }

  fetchApi(match_upcoming_endpoint)
    .then(status)
    .then(json)
    .then(function (data) {
      matches(data);
    })
}

function getSavedMatch() {
  getAllMatch().then(function (data) {
    savedMatches(data);
  });
}

function getTeams() {
  
  if ('caches' in window) {
    caches.match(teams_endpoint)
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            teams(data);
            
          });
        }
      });
  }

  fetchApi(teams_endpoint)
    .then(status)
    .then(json)
    .then(function (data) {
      teamData = data;
      //console.log(data)
      
      teams(data);
      
    })
}

// function getDetailTeamById() {
//   return new Promise(function (resolve, reject) {
//         // Ambil nilai query parameter (?id=)
//         var urlParams = new URLSearchParams(window.location.search);
//         var idParam = urlParams.get("id");
    
//         if ("caches" in window) {
//           caches.match(teams_endpoint + idParam).then(function (response) {
//             if (response) {
//               response.json().then(function (data) {
//                 // console.log("cek logo detail tim : " + data.crestUrl)
//                 detailTeamById(data);
//                 resolve(data);
    
//               });
//             }
//           });
//         }
    
//         fetchApi(teams_endpoint + idParam)
//           .then(status)
//           .then(json)
//           .then(function (data) {
    
//             detailTeamById(data);
    
//             resolve(data);
    
//           });
//       });
// }


function getSavedTeam() {
  getAllTeam().then(function (data) {
   savedFavTeam(data);
  });
}

function deleteSaveMatchById(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction('match_fav', 'readwrite');
      var store = tx.objectStore('match_fav');
      store.delete(id);
      return tx.complete;
    }).then(function () {
      M.toast({ html: 'Match has been deleted!' });
      console.log('Item match deleted');
      getSavedMatch();
    });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  var idInt = parseInt(idParam)
  getTeamById(idInt).then(function (dataSavedTeamById) {
    savedFavTeamById(dataSavedTeamById);
  });
};

function deleteTeamById(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction('teams_fav', 'readwrite');
      var store = tx.objectStore('teams_fav');
      store.delete(id);
      return tx.complete;
    }).then(function () {
      M.toast({ html: 'Team has been deleted!' });
      getSavedTeam();
    });
}

function getTeamById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams_fav", "readonly");
        var store = tx.objectStore("teams_fav");
        return store.get(id);
      })
      .then(function (dataSavedTeamById) {
        resolve(dataSavedTeamById);
      });
  });
}

function getMatchById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("match_fav", "readonly");
        var store = tx.objectStore("match_fav");
        return store.get(id);
      })
      .then(function (dataSavedMatchById) {
        resolve(dataSavedMatchById);
      });
  });
}

function deleteSavedTeamListener(id) {
  var confirmation = confirm("Delete this team?")
  if (confirmation == true) {
    deleteTeamById(id);
    console.log(id + "has been deleted")
  }
}

function deleteSavedMatchListener(id) {
  var confirmation = confirm("Delete this match?")
  if (confirmation == true) {
    deleteSaveMatchById(id);
    console.log(id + "has been deleted")
  }
}

function addFavoriteMatchListener(dataIdMatch) {
  //console.log("hello im from fav match" + dataIdMatch)
  var match = matchData.matches.filter(filterMatchData => filterMatchData.id == dataIdMatch)[0]
  //console.log(match)
  saveMatchFav(match);
}

function addFavoriteTeamListener(data) {
  //console.log("add favorite by id :" + data)
  var team = teamData.teams.filter(filterTeamData => filterTeamData.id == data)[0];
  saveTeamFav(team);
  //console.log(teamData);
}

