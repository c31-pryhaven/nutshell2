import React, { Component } from "react"
import TaskList from "../tasks/TaskList"
import ArticleList from "../articles/ArticlesList"

export default class DashBoardList extends Component {
    render () {
        return (
            <React.Fragment>
                <ArticleList/>
                <TaskList/>
            </React.Fragment>
        )
    }
}