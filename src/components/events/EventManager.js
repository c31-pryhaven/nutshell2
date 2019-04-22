export default {
    get(id) {
        return fetch(`${url}/events/${id}`).then(l => l.json())
    },
    getAll() {
        return fetch(`${url}/events`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/events/${id}`, {
            method: "DELETE"
        })
        .then(l => l.json())
    },
    postEvent(newEvent) {
        return fetch(`${url}/events`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        }).then(data => data.json())
    }
}