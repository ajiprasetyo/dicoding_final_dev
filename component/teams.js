function teams(data) {
  var teamsHTML = "";
  teamData = data;
  var myteam = data.teams;
  console.log(myteam)
  teamsHTML += `<div class="row">`
  myteam.forEach(function (team) {
    //console.log(team)
    teamsHTML += `
  <div class="col s12 m6 l6">
  <div class="card">

    <div class="card-content">
      <div class="center"><img width="64" height="64" src="${team.crestUrl || 'football.svg'}" alt="logo team"></div>
      <div class="center flow-text">${team.name}</div>
      <div class="center">${team.area.name}</div>
      <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
    </div>
    <div class="card-action right-align">
        <a id="save" class="waves-effect waves-light btn-small pink darken-4" onclick="addFavoriteTeamListener(${team.id})">
        <i class="material-icons left">favorite
        </i>Add to Favourite</a>
    </div>

  </div>
  </div>
`
  });
  teamsHTML += `</div>`
  document.getElementById("teams-content").innerHTML = teamsHTML;
}