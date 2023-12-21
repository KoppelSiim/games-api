const gamesController = require("../controllers/GamesController");

module.exports = (app) => {
    app.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.createNew)

    app.route("/games/:id")
    .get(gamesController.getById)
    .delete(gamesController.deleteById)
}