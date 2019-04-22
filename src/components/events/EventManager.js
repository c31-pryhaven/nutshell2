<<<<<<< HEAD
const url = "http://localhost:8088"
=======
const url = "http://localhost:8088";
>>>>>>> c1fcc3ceb601f05e8bcef16e2e1056454612275a

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
    removeAndList(id) {
        return fetch(`${url}/events/${id}`, {
          method: "DELETE"
        })
          .then(e => e.json())
          .then(this.getAll);
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