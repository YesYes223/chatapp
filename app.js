const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/:room", (req, res) => {
    if (req.query.username && req.query.username.trim()) {
        res.render("room", {"room": req.params.room})
    } else {
        res.redirect("/")
    }
})

io.on("connection", socket => {
    console.log("User connected")
    socket.on("userJoin", data => {
        const room = data.room
        const username = data.username
        socket.join(room)
        socket.broadcast.to(room).emit("userJoin", {"username": username})
    })
})

server.listen(8080)