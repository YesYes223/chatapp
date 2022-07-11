const socket = io()

const usersContainer = document.querySelector(".users-container")
const room = document.querySelector(".room-name").innerHTML
const url = new URL(window.location.href)
const username = url.searchParams.get("username")
const messageButton = document.querySelector(".message-button")
const chatContainer = document.querySelector(".chat-container")
const messageTextarea = document.querySelector(".message-textarea")

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
    const div = document.createElement("div")
    div.classList.add("message-container")
    div.classList.add("user-joined-container")
    div.innerHTML = `
        <div class="info-container">
            <p class="username">Server</p>
            <p class="time-sent">2:47pm</p>
        </div>
        <p>${user.username} joined the room.</p>
    `
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { // check if user is at the bottom of the page
        chatContainer.appendChild(div)
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        chatContainer.appendChild(div)
    }
})

socket.on("userDisconnect", user => {
    const userElement = document.getElementById(user.id)
    usersContainer.removeChild(userElement)
    const div = document.createElement("div")
    div.classList.add("message-container")
    div.classList.add("user-left-container")
    div.innerHTML = `
        <div class="info-container">
            <p class="username">Server</p>
            <p class="time-sent">2:47pm</p>
        </div>
        <p>${user.username} left the room.</p>
    `
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { // check if user is at the bottom of the page
        chatContainer.appendChild(div)
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        chatContainer.appendChild(div)
    }
})

socket.on("userMessage", data => {
    const div = document.createElement("div")
    div.classList.add("message-container")
    div.innerHTML = `
        <div class="info-container">
            <p class="username">${data.username}</p>
            <p class="time-sent">2:47pm</p>
        </div>
        <p>${data.message}</p>
    `
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) { // check if user is at the bottom of the page
        chatContainer.appendChild(div)
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        chatContainer.appendChild(div)
    }
})

messageButton.addEventListener("click", () => {
    socket.emit("userMessage", {"username": username, "message": messageTextarea.value, "room": room})
    const div = document.createElement("div")
    div.classList.add("message-container")
    div.innerHTML = `
        <div class="info-container">
            <p class="username">${username}</p>
            <p class="time-sent">2:47pm</p>
        </div>
        <p>${messageTextarea.value}</p>
    `
    chatContainer.appendChild(div)
    window.scrollTo(0, document.body.scrollHeight);
    messageTextarea.value = ""
})