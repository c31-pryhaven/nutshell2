import React, { Component } from "react"



export default class ArticleList extends Component {


    render() {
        return (
            <React.Fragment>
                <section className="card">
                    <div className="taskButton">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/articles/new")
                            }}
                        >
                            Create Task
                        </button>
                    </div>
                </section>
                <h1>My Articles</h1>
                <section>
                    {this.props.articles.map(article => (
                        <div key={article.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                    <h6>{article.url}</h6>
                                    <h6>{article.synopsis}</h6>
                                { <button
                                    onClick={() => this.props.deleteArticle(article.id)}
                                    className="btn btn-success">
                                    Delete
                                    </button> }
                            </div>
                        </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
}