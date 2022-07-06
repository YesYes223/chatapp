const socket = io()

const usersContainer = document.querySelector(".users-container")
const room = document.querySelector(".room-name").innerHTML
const url = new URL(window.location.href)
const username = url.searchParams.get("username")

function addUsernameToContainer(username, id) {
    const tag = document.createElement("p")
    const text = document.createTextNode(username)
    tag.appendChild(text)
    tag.setAttribute("id", id)
    usersContainer.appendChild(tag)
}

socket.emit("userJoin", {"room": room, "username": username})

socket.on("usersConnected", users => {
    users.forEach(user => {
        addUsernameToContainer(user.username, user.id)
    });
})

socket.on("userJoin", user => {
    addUsernameToContainer(user.username, user.id)
})

socket.on("userDisconnect", user => {
    const userElement = document.getElementById(user.id)
    usersContainer.removeChild(userElement)
})