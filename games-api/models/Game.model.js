module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
        gameId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'games',
        primaryKey: 'gameId',
        timestamps: false
    });

    return Game;
};
