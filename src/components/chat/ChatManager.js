const url = "http://localhost:8088";

export default {
    get(id) {
        return fetch(`${url}/messages/${id}`).then(l => l.json())
    },
    getAll(currentUserId) {
        return fetch(`${url}/messages?userId=${currentUserId}`).then(l => l.json())
    },
    removeAndList(id) {
        return fetch(`${url}/messages/${id}`, {
                method: "DELETE"
            })
            .then(e => e.json())
            .then(this.getAll);
    },
    postMessage(newMessage) {
        return fetch(`${url}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }).then(data => data.json())
    },
    patchMessage(editedMessage) {
        return fetch(`${url}/messages/${editedMessage.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedMessage)
        }).then(data => data.json());
    }

}