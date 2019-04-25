import React, { Component } from "react"


let currentUserId = sessionStorage.getItem("userId")
export default class ArticleForm extends Component {
    state = {
        title: "",
        url: "",
        synopsis: "",
        userId: ""
    }
    currentUserId = sessionStorage.getItem("userId")
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };

    newArticle = event => {
        event.preventDefault();
        const article = {
            title: this.state.articleTitle,
            url: this.state.articleUrl,
            synopsis: this.state.articleSynopsis,
            userId: Number(currentUserId)
        };
        this.props.addArticle(article).then(() => this.props.history.push("/articles"))
    }


    render() {
        return (
            <React.Fragment>
                <form className="card">
                <div className="form-group">
                <label htmlFor="articleTitle">Article Ttile:</label>
                <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="articleTitle"
                            placeholder="article title"
                        />
                <label htmlFor="articleUrl">Article URL:</label>
                <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="articleUrl"
                            placeholder="article url"
                        />
                <label htmlFor="articleSynopsis">Article Synopsis:</label>
                <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="articleSynopsis"
                            placeholder="article synopsis"
                        />
                        <button
                            type="submit"
                            onClick={this.newArticle}
                            className="btn btn-primary"
                            >
                            Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}