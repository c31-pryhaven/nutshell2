const url = "http://localhost:8088";

export default {
    get(id) {
        return fetch(`${url}/tasks/${id}`).then(l => l.json())
    },
    getAll() {
        return fetch(`${url}/tasks?isComplete=false`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/tasks/${id}`, {
            method: "DELETE"
        })
        .then(l => l.json())
    },
    removeAndList(id) {
        return fetch(`${url}/tasks/${id}`, {
          method: "DELETE"
        })
          .then(e => e.json())
          .then(this.getAll);
      },
    postTask(newTask) {
        return fetch(`${url}/tasks`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(data => data.json())
    },
    put(editedTask) {
        return fetch(`${url}/tasks/${editedTask.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedTask)
        }).then(data => data.json());
    },
    patch(completedTask) {
        return fetch(`${url}/tasks/${completedTask.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedTask)
        }).then(data => data.json());
    }
}