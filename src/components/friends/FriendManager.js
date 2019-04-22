export default {
    get(id) {
        return fetch(`${url}/friends/${id}`).then(l => l.json())
    },
    getAll() {
        return fetch(`${url}/friends`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/friends/${id}`, {
            method: "DELETE"
        })
        .then(l => l.json())
    },
    postFriend(newFriend) {
        return fetch(`${url}/friends`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFriend)
        }).then(data => data.json())
    }
}