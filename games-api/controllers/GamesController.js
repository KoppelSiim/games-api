
const mariadb = require("../db")
const Game = db.games



exports.getAll = async (res, req) => {

    const games = await Game.findAll({attributes:["name"]})
    res.send(games)

}
     /*
    try{
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT etc")
        res.send(rows)
    }catch(error){
        throw error
    }finally{
        if(connection) return connection.end()
    }*/
