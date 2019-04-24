const url = "http://localhost:8088";

export default {
    get(id) {
        return fetch(`${url}/users/${id}`).then(l => l.json())
    },
    getAll() {
        return fetch(`${url}/users`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/users/${id}`, {
                method: "DELETE"
            })
            .then(l => l.json())
    },
    removeAndList(id) {
        return fetch(`${url}/users/${id}`, {
                method: "DELETE"
            })
            .then(e => e.json())
            .then(this.getAll);
    },
    postMessage(newMessage) {
        return fetch(`${url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }).then(data => data.json())
    },
    postUser(newUser) {
        return fetch(`${url}/users`, {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(data => data.json())
    }
}