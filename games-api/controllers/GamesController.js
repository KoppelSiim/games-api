const {db} = require("../db")
const Game = db.games

exports.getAll = async (req,res) => {
    const games = await Game.findAll({attributes:["name"]})
    res.send(games)
}

exports.deleteById = async(req,res) => {
    let result
    try {
        result = await Game.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("GamesDelete: ", error)
        res.status(500).send({error:"Something has gone wrong..."})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"Game not found"})
        return
    }
    res
    .status(204).send()
}

exports.updateById = async (req,res) => {
    let result
    delete req.body.id
    try {
        result = await Game.update(req.body,{where: {id: req.params.id}})
    } catch (error) {
        console.log("GamesUpdate: ", error)
        res.status(500).send({error:"Something has gone wrong..."})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"Game not found"})
        return
    }
    const game = await Game.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/games/${game.id}`)
    .json(game)
}

exports.createNew = async (req,res) => {
    let game
    try {
        game = await Game.create(req.body)
    } catch(error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":error.errors.map((item) => item.message)})
        } else {
            console.log("GamesCreate: ", error)
            res.status(500).send({"error" : "asdasd"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl(req)}/games/${games.id}`)
    .json(game);
    console.log(game)
}