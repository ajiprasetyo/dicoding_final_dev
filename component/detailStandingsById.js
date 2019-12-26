function detailStandingsById(data) {
    var teamHTML = "";
    var player = data.squad;
    var playerHTML = "";
    //console.log(data)
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
    // Menyusun komponen card artikel secara dinamis
    teamHTML += `
        <div class="card" style="padding:10px">
          <div class="center">
            <img class="responsive-img" width="200" src="${data.crestUrl}" alt="">
            <h1>${data.name}</h1>
            <h5>${data.website}</h5>
            <ul>
              <li>
                <i class="material-icons" style="color: #168c80">location_on</i>
                ${data.address}
                </li>
              <li>
                <i class="material-icons" style="color: #168c80">local_phone</i>
                ${data.phone}
                </li>
            </ul>
          </div>
        </div>

        <div class="card"> 
          <table class="striped">
            <thead>
              <tr>
                  <th>Player Name</th>
                  <th>Position</th>
              </tr>
            </thead>
          <tbody>
          `+ playerHTML + `
          </tbody>
          </table>
        </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("team-detail").innerHTML = teamHTML;
}