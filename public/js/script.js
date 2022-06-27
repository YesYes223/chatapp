
function goToRoom(e) {
    const container = document.querySelector(".container")
    const room = container.querySelector("select").value
    const username = container.querySelector(".username").value
    if (username.trim()) {
        window.location = `/${room}?username=${username}`
    }
}