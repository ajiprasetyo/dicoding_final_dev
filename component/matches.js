function matches(data) {
    var matchHTML = "";
    matchData = data;
    var match = data.matches;
    var maxLoopData = match.length;

    if (match.length > 15) {
        maxLoopData = 15;
    }

    matchHTML += `<div class="row">`
    for (let i = 0; i < maxLoopData; i++) {
        matchHTML += `
      <div class="col s12 m6 l6">
        <div class="card center">
          <div class="card-content">
            <h5>${match[i].homeTeam.name}</h5>
            <p>vs</p>
            <h5>${match[i].awayTeam.name}</h5>
            <p>${convertUTCDate(new Date(match[i].utcDate))}</p>
          </div>
          <div class="card-action right-align">
            <a id="save" class="waves-effect waves-light btn-small pink darken-4" onclick="addFavoriteMatchListener(${match[i].id})">
            <i class="material-icons left">favorite</i>Add to Favorite</a>
          </div>
        </div>
      </div>
      `;

    }
    matchHTML += `</div>`
    document.getElementById("content-match").innerHTML = matchHTML;

}