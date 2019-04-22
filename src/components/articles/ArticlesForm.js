import React, { Component } from "react"

export default class ArticleForm extends Component {
    state = {
        title: "",
        url: "",
        synopsis: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };

    newArticle = event => {
        event.preventDefault();
        const article = {
            title: this.state.title,
            url: this.state.url,
            synopsis: this.state.synopsis
        };
        this.props.addArticle(article).then(() => this.props.history("/articles"))
    }


    render() {
        return (
            <React.Fragment>
                <form className="card">
                <div className="form-group">
                <label>Article Ttile</label>
                <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="articleTtile"
                            placeholder="article title"
                        />
                <label>Article URl</label>
                <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="articleUrl"
                            placeholder="article url"
                        />
                <label>Article Synopsis</label>
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
                            className="btn btn-primary"/>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}