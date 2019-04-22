const url = "http://localhost:8088";

export default {
    get(id) {
        return fetch(`${url}/messages/${id}`).then(l => l.json())
    },
    getAll() {
        return fetch(`${url}/messages`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/messages/${id}`, {
            method: "DELETE"
        })
        .then(l => l.json())
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
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }).then(data => data.json())
    }
}