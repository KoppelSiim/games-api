module.exports = (sequelize, Sequelize) => {
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
        }
    });

    return Game;
};
