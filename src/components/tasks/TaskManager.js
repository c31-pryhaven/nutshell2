export default {
    get(id) {
        return fetch(`${url}/tasks/${id}`).then(l => l.json())
    },
    getAll() {
        return fetch(`${url}/tasks`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/tasks/${id}`, {
            method: "DELETE"
        })
        .then(l => l.json())
    },
    postTask(newTask) {
        return fetch(`${url}/tasks`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(data => data.json())
    }
}