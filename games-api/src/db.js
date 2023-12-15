const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        define: {
            timestamps:false
        }
    }

)

const db = {}
db.Sequelize
db.sequelize
db.games = require("./models/Game.model")(sequelize, Sequelize)

async function Sync() {
    await sequelize.sync({alter:true})
}

module.exports = {db, Sync}