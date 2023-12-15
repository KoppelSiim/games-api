const gamesController = require ("../controllers/GamesController")

module.exports = (app) => {
    app.rout("/games").get(gamesController.getAll)
}