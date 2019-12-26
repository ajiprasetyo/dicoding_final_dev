function standings(data) {
    var tableHTML = "";
    data.standings.forEach(function (standing) {
        //console.log(standing)
        var dataTableHTML = "";
        standing.table.forEach(function (club) {
            club = JSON.parse(JSON.stringify(club).replace(/http:/g, 'https:'));
            //console.log(club)
            dataTableHTML += `<tr>
        <td class="center-align">${club.position}</td>
          <td>
          <a href="./detailTeam.html?id=${club.team.id}">
          <p class="hide-on-small-only">
          <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
          ${club.team.name}
          </p>
          <p class="hide-on-med-and-up">
          <img src=${club.team.crestUrl}  alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px">
          </p>
          </a>
          </td>
          <td class="center-align">${club.playedGames}</td>
          <td class="center-align">${club.won}</td>
          <td class="center-align">${club.draw}</td>
          <td class="center-align">${club.lost}</td>
          <td class="center-align">${club.goalsFor}</td>
          <td class="center-align">${club.goalsAgainst}</td>
          <td class="center-align">${club.goalDifference}</td>
          <td class="center-align">${club.points}</td>
        </tr>`;
        })

        tableHTML += `
      <h5>PREMIER LEAGUE</h5>
      <div class="card">
        <div class="card-content">
          <table class="responsive-table highlight" >
          <thead>
            <tr>
              <th class="center-align">Pos</th>
              <th>Team</th>
              <th class="center-align">P</th>
              <th class="center-align">W</th>
              <th class="center-align">D</th>
              <th class="center-align">L</th>
              <th class="center-align">F</th>
              <th class="center-align">A</th>
              <th class="center-align">GD</th>
              <th class="center-align">Pts</th>
            </tr>
          </thead>
          <tbody>` + dataTableHTML + `</tbody>
          </table>
        </div>
      </div>
      `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("standings").innerHTML = tableHTML;
}