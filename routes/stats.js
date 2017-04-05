var express = require('express');
var router = express.Router();

const Game = require('../game/game');

router.get('/', function(req, res, next) {
    let game = Game.get();
    res.render('stats', {
        title: 'Territor.io Stats',
        lobbies: game.lobbies.count,
        players: game.players.count
    });
});

module.exports = router;
