function savedMatches(data) {
    var match = data;
    var saveMatchHTML = ""

    saveMatchHTML += '<div class="row">'
    match.forEach(function (dataMatch) {
      saveMatchHTML += `
      <div class="col s12 m6 l6">
      <div class="card center">
        <div class="card-content">
          <h5>${dataMatch.homeTeam.name}</h5>
          <p>vs</p>
          <h5>${dataMatch.awayTeam.name}</h5>
          <p>${convertUTCDate(new Date(dataMatch.utcDate))}</p>
        </div>
        <div class="card-action right-align">
          <a id="save" class="waves-effect waves-light btn-small #f44336 red" onclick="deleteSavedMatchListener(${dataMatch.id})">
          <i class="material-icons left">delete_forever</i>Delete</a>
        </div>
      </div>
      </div>`
      
    });
    saveMatchHTML += "</div>"
    document.getElementById("saved-match").innerHTML = saveMatchHTML;

}