let users = {
    "Group1": [],
    "Group2": [],
    "Group3": [],
}

function addUser(id, username, room) {
    const user = {id, username}
    users[room].push(user)
}

function removeUser(id, room) {
    const user = users[room].find(user => user.id === id)
    users[room].splice(users[room].indexOf(user), 1)
    return user
}

module.exports = {addUser, removeUser, users}