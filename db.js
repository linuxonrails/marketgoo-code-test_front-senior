// DB INIT
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database",
});

// DB MODEL
const Player = sequelize.define(
    "players",
    {
        id: { type: Sequelize.SMALLINT, primaryKey: true },
        name: Sequelize.STRING,
        team: Sequelize.STRING,
        score: Sequelize.NUMBER,
    },
    {
        timestamps: true,
    }
);

// DB LOAD DATA
Player.sync({ force: true }).then(() => {
    // Table created
    Player.create({
        name: "Peter",
        team: "Pandas",
        score: 1,
    });

    Player.create({
        name: "Jhon",
        team: "Cobrakay",
        score: 10,
    });

    Player.create({
        name: "Tommy",
        team: "Space",
        score: 20,
    });
});

module.exports = { Player, sequelize };
