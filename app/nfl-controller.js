function PlayerController() {
    var loading = true; //Start the spinner
    var playersService = new PlayersService(ready);


    this.getPlayersSearch = function getPlayersSearch(e) {
        e.preventDefault();
        var player = e.target.player.value;
        playersService.getPlayersSearch(player)
        updateRoster(playersService.getPlayers());
    }


    function ready(data) {
        loading = false; //stop the spinner
    }

    function updateRoster(players) {
        var rosterTemplate = ''
        for (var i = 0; i < players.length; i++) {
            var player = players[i]
            rosterTemplate += `
            <div class="player-card col-xs-12 col-md-6">
            <img src="${player.photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
            <h2>${player.fullname}</h2>
            <h4>${player.position}</h4>
            <h4>${player.pro_team}</h4>
            <button type="button" id="${player.id}" class="btn btn-success btn-sm addPlayer" onClick="app.controllers.playerCtrl.addPlayer(
                '${player.id}')">Add to Team</button>
        </div>
            `
        }
        document.getElementById('players').innerHTML = rosterTemplate
    }

    function updateMyTeam(arr) {
        var myTeamTemplate = ''
        for (var i in arr) {
            var player = arr[i];
            myTeamTemplate += `
            <div class="player-card col-xs-12 col-md-6">
            <img src="${player.photo}" alt="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/">
            <h2>${player.fullname}</h2>
            <h4>${player.position}</h4>
            <h4>${player.pro_team}</h4>
            <button type="button" id="${player.id}" class="btn btn-danger btn-sm removePlayer" onClick="app.controllers.playerCtrl.removePlayer(
                '${player.id}')">Drop</button>
        </div>
            `
        }
        document.getElementById('my-team').innerHTML = myTeamTemplate
    }

    this.addPlayer = function addPlayer(id) {
        playersService.addPlayer(id)
        updateMyTeam(playersService.getMyTeam())
        updateRoster(playersService.getPlayers())
    }

    this.removePlayer = function removePlayer(id) {
        playersService.removePlayer(id)
        updateMyTeam(playersService.getMyTeam())
        updateRoster(playersService.getPlayers())
    }
}