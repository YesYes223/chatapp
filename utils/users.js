let users = []

function addUser(id, username, room) {
    const user = {id, username, room}
    users.push(user)
}

function removeUser(id) {
    const user = users.find(user => user.id === id)
    users.splice(users.indexOf(user), 1)
    return user
}

function getAllUsers(room) {
    const allUsers = users.filter(user => user.room === room)
    return allUsers
}

module.exports = {addUser, removeUser, getAllUsers, users}