const url = "http://localhost:8088"

export default {
    get(id) {
        return fetch(`${url}/events/${id}`).then(l => l.json())
    },
    getAll(currentUserId) {
        return fetch(`${url}/events?userId=${currentUserId}`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/events/${id}`, {
            method: "DELETE"
        })
            // .then(l => l.json())
    },
    removeAndList(id) {
        return fetch(`${url}/events/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(this.getAll);
    },
    postEvent(newEvent) {
        return fetch(`${url}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        }).then(data => data.json())
    },
    putEvent(editedEvent) {
        return fetch(`${url}/events/${editedEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedEvent)
        }).then(data => data.json());
    }
}