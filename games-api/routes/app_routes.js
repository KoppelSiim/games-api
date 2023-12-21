const gamesController = require("../controllers/GamesController");

module.exports = (app) => {
    app.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.createNew)

    app.route("/games/:id")
    .get(gamesController.getById)
    .put(gamesController.updateById)
    .delete(gamesController.deleteById)
}