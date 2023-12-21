module.exports = (sequelize,Sequelize) => {
    const Game = sequelize.define("game", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        developer: {            
            type: Sequelize.STRING,
            allowNull: false
        },
        publisher: {            
            type: Sequelize.STRING,
            allowNull: false
        },
        releasedate: {            
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        metacriticscore: {            
            type: Sequelize.INTEGER,
            allowNull: true
        },
        microtransactions: {            
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultvalue: false
        }
    })
    return Game
}