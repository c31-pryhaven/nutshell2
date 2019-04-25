import React, { Component } from "react"
import ArticleManager from "./ArticleManager";



let currentUserId = sessionStorage.getItem("userId")
export default class ArticleEditForm extends Component {
    state = {
        title: "",
        url: "",
        synopsis: "",
        userId: "",
        timeStamp: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };

    updateExistingArticle = event => {
        event.preventDefault();
        const editiedArticle = {
            id: Number(this.props.match.params.articleId),
            title: this.state.title,
            url: this.state.url,
            synopsis: this.state.synopsis,
            userId: Number(currentUserId)
        };
        this.props.updateArticle(editiedArticle).then(() => this.props.history.push("/articles"))
        this.props.userSpecificData()
    }


    componentDidMount() {
        ArticleManager.get(this.props.match.params.articleId)
            .then(article => {
                this.setState({
                    title: article.title,
                    url: article.url,
                    synopsis: article.synopsis
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <form className="card">
                    <div className="form-group">
                        <label htmlFor="articleTitle">Article Title:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="title"
                            value={this.state.title}
                        />
                        <label htmlFor="articleUrl">Article URL:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="url"
                            value={this.state.url}
                        />
                        <label htmlFor="articleSynopsis">Article Synopsis:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="synopsis"
                            value={this.state.synopsis}
                        />
                        <button
                            type="submit"
                            onClick={this.updateExistingArticle}
                            className="btn btn-primary"
                        >
                            Submit</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}