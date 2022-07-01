const socket = io()

const room = document.querySelector(".room-name").innerHTML
const url = new URL(window.location.href)
const username = url.searchParams.get("username")
socket.emit("userJoin", {"room": room, "username": username})

socket.on("userJoin", data => {
    console.log(data)
})