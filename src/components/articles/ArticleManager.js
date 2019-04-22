const url = "http://localhost:8088"


export default {
    get(id) {
        return fetch(`${url}/articles/${id}`).then(l => l.json())
    },
    getAll() {
        return fetch(`${url}/articles`).then(l => l.json())
    },
    delete(id) {
        return fetch(`${url}/articles/${id}`, {
            method: "DELETE"
        })
        .then(l => l.json())
    },
    removeAndList(id) {
        return fetch(`${url}/articles/${id}`, {
          method: "DELETE"
        })
          .then(e => e.json())
          .then(this.getAll);
      },
    postArticle(newArticle) {
        return fetch(`${url}/articles`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArticle)
        }).then(data => data.json())
    }
}