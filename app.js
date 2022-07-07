const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)
const users = require("./utils/users")

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
    socket.on("userJoin", data => {
        const room = data.room
        const username = data.username
        socket.join(room)
        users.addUser(socket.id, username, room)  // add user to the 'users' array
        socket.emit("usersConnected", users.users[room])  // send every user in the room to the client
        socket.broadcast.to(room).emit("userJoin", {"username": username, "id": socket.id})
    })
    socket.on("disconnecting", () => {
        const room = Array.from(socket.rooms)[1]
        const user = users.removeUser(socket.id, room)  // remove the user from the 'users' array and return the user
        socket.broadcast.to(room).emit("userDisconnect", {"username": user.username, "id": socket.id})
    })
})

server.listen(8080)