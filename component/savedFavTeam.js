function savedFavTeam(data) {
    var teamFavHTML = "";
    teamFavHTML += `<div class="row">`
    data.forEach(function (dataSavedTeam) {
      //console.log(dataSavedTeam.name)
      teamFavHTML += `
      <div class="col s12 m6 l6">
        <div class="card" style="padding:10px">
          <a href="./detailTeam.html?id=${dataSavedTeam.id}&saved=true">
            <div class="center">
            <img src="${dataSavedTeam.crestUrl || 'football.svg'}" width="64" height="64" alt="logo team"/>
              <h5>${dataSavedTeam.name}</h5>
              <div class="center">${dataSavedTeam.area.name}</div>
              <div class="center"><a href="${dataSavedTeam.website}" target="_blank">${dataSavedTeam.website}</a></div>
            </div>
            <div class="card-action right-align">
                <a id="save" class="waves-effect waves-light btn-small #f44336 red" onclick="deleteSavedTeamListener(${dataSavedTeam.id})">
                <i class="material-icons left">delete_forever</i>Delete</a>
              </div>
          </a>
        </div>
      </div>
      `;
    });
    teamFavHTML += `</div>`
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("saved-team").innerHTML = teamFavHTML;
}