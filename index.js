require ("dotenv").config()
const mariadb = require("mariadb")
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const swaggerUI = require("swagger-ui-express")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load("./docs/swagger.yaml")

// Connection settings
const cool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

app.use(cors())
app.use(express.json())
require("./routes/app_routes")

const games = [
    {id: 1, name:"LOL", price: 29.99},
    {id: 2, name:"CS:GO", price: 29.99},
    {id: 3, name:"Valorant", price: 29.99},
    {id: 4, name:"AOE2", price: 29.99},
    {id: 5, name:"OOT", price: 29.99}
]


app.get('/games', (req,res) => {
    res.send(games)
})

app.get('/games/:id', (req, res) =>{

    if (typeof games[req.params.id -1] === 'undefined')
    {
        return res.status(404).send({error: "Game not found"})
    }

    res.send(games[req.params.id -1])
})

app.post('/games', (req, res) =>{

    if(!req.body.name || !req.body.price) {
        return res.status(400).send({error: 'One or all params are missing'})
    }

    let game = {
        id:games.length +1,
        price: req.body.price,
        name: req.body.name
    }

    games.push(game)
    
    res.status(201)
        .location(`${getBaseUrl(req)}/games/${games.length}`)
        .send(game)
})

app.delete('/games/:id', (req,res) =>{
    if (typeof games[req.params.id -1] === 'undefined'){
        return res.status(404).send({error: "Game not found"})
    }

    games.splice(req.params.id -1, 1)

    res.status(204).send({error: "No content"})
})

app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen (port , () => {
    console.log(`Api up at: Http://localhost:${port}`)
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.header.host}`
}