function savedFavTeamById(dataSavedTeamById) {
  var player = dataSavedTeamById.squad;
  var teamFavHTML = "";
  var playerHTML = "";

  if(player == undefined) {
    console.log('Data player not found')
  } else {
    player.forEach(function (players) {
      playerHTML += `
            <tr>
              <td>
              ${players.name}
              </td>
              <td>
              ${players.position || "Coach"} 
              </td>
            </tr>
        `
    });
  }


   
  
  
  // Menyusun komponen card artikel secara dinamis
  teamFavHTML += `
        <div class="card" style="padding:10px">
          <div class="center">
            <img class="responsive-img" width="200" src="${dataSavedTeamById.crestUrl}" alt="">
            <h1>${dataSavedTeamById.name}</h1>
            <h5>${dataSavedTeamById.website}</h5>
            <ul>
              <li>
                <i class="material-icons" style="color: #168c80">location_on</i>
                ${dataSavedTeamById.address}
                </li>
              <li>
                <i class="material-icons" style="color: #168c80">local_phone</i>
                ${dataSavedTeamById.phone}
                </li>
            </ul>
          </div>
        </div>

        <div class="card"> 
          <table class="striped">
            <thead>
              <tr>
                  <th id="th-player">Player Name</th>
                  <th id="th-position">Position</th>
              </tr>
            </thead>
          <tbody>
          `+ playerHTML + `
          </tbody>
          </table>
        </div>
    `;
  // Sisipkan komponen card ke dalam elemen dengan id #content
  document.getElementById("team-detail").innerHTML = teamFavHTML; 
}