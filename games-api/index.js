require("dotenv").config()
const express = require('express');
const cors = require('cors')
const app = express();
//const port = 8080
const port = process.env.APP_PORT
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');



app.use(cors());
const games = [ 
    {
        id: 1, 
        name: "Witcher 3", 
        price: 29.99, 
        description: "Toss a coin"
    },
    {
        id: 2, name: "Team Fortress 2",
        price: 0,
        description: "The original proprietor of the microtransaction concept"
    },
    {
        id: 3, 
        name: "Minecraft",
        price: 29.99,
        description: "Lego without the knobby bits"},
    {
        id: 4,
        name: "Counter Strike 2",
        price: 0,
        description: "Cheaters be here"
    },
    {
        id: 5,
        name: "Paladins: Champions of the Realm",
        price: 0,
        description: "This one is dying"
    },
    {id: 6, name: "Super Mario Bros. Wonder", price: 59.99, description: "All hail Nintendo"},
    {id: 7, name: "Art Sqool", price: 9.99, description: "Cool but weird indie game"},
    {id: 8, name: "Sonic the Hedgehog", price: 1.99, description: "Console wars started here"},
    {id: 9, name: "Sonic the Hedgehog 2", price: 9.00, description: "First global game launch event - Sonic 2sday"},
]

// "https://meet.google.com/uwe-xwyz-rpq"

app.use(express.json());

require("./routes/app_routes")(app)

app.get("/errors", async (req,res) => {
    res.statusCode(404).send({"error": "something went wrong"})
})

// method 1, we subtract one from the id input by the user.
 app.get('/games/:id', (req, res) => {
    if (typeof games[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Game not found"})
    }
    res.send(games[req.params.id - 1])
 })

// method 2, we locate the item with the described id in the request, irrelevant of its location in the array.
// app.get('/games/:id', (req, res) => {
//     if (typeof games[req.params.id - 1] === 'undefined'){
//         return res.status(404).send({error: "Game not found"})
//     }    
// const game = games.find(g => g.id== req.params.id);
// res.send(game);});  kood by: Nirgi

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.post('/games', (req,res) => {
    if(!req.body.name || !req.body.price || !req.body.description) {
        return res.status(400).send({error: "One or all parameters that are required is missing"})
    }
    let game = {
        id: games.length +1,
        price: req.body.price,
        name: req.body.name,
        description: req.body.description
    }
    games.push(game)

    res.status(201)
        .location(`${getBaseUrl(req)}/games/${games.length}`)
        .send(game)
})

app.delete('/games/:id', (req, res) => {
    if(typeof games[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Game not found"})
    }

    games.splice(req.params.id - 1, 1)

    res.status(204).send({error: "No Content"})
})

app.listen(port, async () => {
    console.log(`Api up at: Http://localhost:${port}`)})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}