const socket = io()

const usersContainer = document.querySelector(".users-container")
const room = document.querySelector(".room-name").innerHTML
const url = new URL(window.location.href)
const username = url.searchParams.get("username")

function addUsernameToContainer(username) {
    const tag = document.createElement("p")
    const text = document.createTextNode(username)
    tag.appendChild(text)
    usersContainer.appendChild(tag)
}

socket.emit("userJoin", {"room": room, "username": username})

socket.on("usersConnected", data => {
    data.forEach(user => {
        addUsernameToContainer(user.username)
    });
})

socket.on("userJoin", user => {
    addUsernameToContainer(user.username)
})