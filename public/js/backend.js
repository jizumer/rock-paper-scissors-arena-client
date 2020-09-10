function loadStats() {
    var resultElement = document.getElementById('stats');
    resultElement.innerHTML = '';
    axios.get('http://localhost:8080/stats')
        .then(function (response) {
            resultElement.innerHTML = generateHtmlStats(JSON.parse(JSON.stringify(response.data)))
        })
        .catch(function (error) {
            resultElement.innerHTML = JSON.stringify(error);
        });
}

function playNewRound() {
    console.log('lol')
    let playerId = refreshPlayerId()
    axios.put('http://localhost:8080/rounds/play/' + createUUID(),
        {
            "idPlayer": playerId
        }).then(function (response) {
            loadRoundsByPlayer()
        })
        .catch(function (error) {
            resultElement.innerHTML = JSON.stringify(error);
        });
}

function loadRoundsByPlayer() {
    var resultElement = document.getElementById('rounds');
    var roundCounter = document.getElementById('round-counter');

    let playerId = refreshPlayerId()
    resultElement.innerHTML = '';

    axios.get('http://localhost:8080/rounds/player/' + playerId)
        .then(function (response) {
            let parsedData = JSON.parse(JSON.stringify(response.data))
            resultElement.innerHTML = generateHtmlTable(parsedData)
            roundCounter.textContent = 'Rounds played so far: ' + parsedData.length
        })
        .catch(function (error) {
            resultElement.innerHTML = JSON.stringify(error);
        });
}

function restartGame() {
    var player = document.getElementById('current-player');
    player.textContent = createUUID()
    loadRoundsByPlayer()
}

function refreshPlayerId() {
    var player = document.getElementById('current-player');

    if (player.textContent === "") {
        player.textContent = createUUID()
    }
    return player.textContent
}

function generateHtmlTable(rounds) {
    let start = '<table style="width:100%"><tr><th>Player 1</th><th>Player 2</th><th>Result</th></tr>'
    let rows = ''
    for (let i = 0; i < rounds.length; i++) {
        rows = rows + '<tr><td>'
            + rounds[i].player1Move + '</td>'
            + '<td>' + rounds[i].player2Move + '</td>'
            + '<td>' + rounds[i].result
            + '</td></tr>'
    }

    return start + rows + '</table>'
}

function generateHtmlStats(stats) {

    return '<div>Player 1 wins: ' + stats.player1Wins + '</div>'
        + '<div>Player 2 wins: ' + stats.player2Wins + '</div>'
        + '<div>Draws: ' + stats.draws + '</div>'
        + '<div>Total rounds: ' + stats.totalRounds + '</div>'
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}