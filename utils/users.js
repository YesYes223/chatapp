let users = {
    "Group1": [],
    "Group2": [],
    "Group3": [],
}

function addUser(id, username, room) {
    const user = {id, username}
    users[room].push(user)
}

module.exports = {addUser, users}