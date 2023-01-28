const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// BD INIT
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database",
});

// BD MODEL
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

// BD LOAD DATA
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

// Middlewares
app.use(bodyParser.json());

// PUBLIC ROUTE
app.use(express.static("./public"));

// ROUTES
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

// API
app.get("/players", (req, res) => {
    setTimeout(() => {
        Player.findAll({ order: [["score", "DESC"]], raw: true })
            .then((players) => res.json({ status: "ok", data: players }))
            .catch(() => res.json({ status: "ko" }));
    }, 2000);
});

app.post("/players", (req, res) => {
    setTimeout(() => {
        Player.sync().then(() => {
            const { name, team, score } = req.body;
            Player.create({
                name: name,
                team: team,
                score: score,
            });
            res.status(200).json({
                status: "ok",
                data: {
                    name: name,
                    team: team,
                    score: score,
                },
            });
        });
    }, 2000);
});

app.delete("/players/:id", (req, res) => {
    setTimeout(() => {
        Player.destroy({ where: { id: req.params.id } });
        res.status(200).json({ status: "ok" });
    }, 2000);
});

// RUN
sequelize
    .authenticate()
    .then(() => {
        console.log("BD Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const server = app.listen(port, () =>
    console.log(`Express started on port ${port}!`)
);

// cron score updater
const cron = require("node-cron");
const task = cron.schedule("*/5 * * * * *", () => {
    Player.findOne({ order: sequelize.random() }).then((player) => {
        player.update({ score: player.get("score") + 12 });
    });
});
task.start();

// Get Player and socket emit
const getApiAndEmit = (socket) => {
    const streamTask = cron.schedule("*/10 * * * * *", () => {
        Player.findAll({ raw: true }).then((players) => {
            socket.emit("update/players", players);
        });
    });
    streamTask.start();

    socket.on("disconnect", () => {
        streamTask.stop();
        console.log("Client disconnected");
    });
};

// SOCKET
require("./io")(server, getApiAndEmit);
