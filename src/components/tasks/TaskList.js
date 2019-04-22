import React, { Component } from "react"
// import { Link } from "react-router-dom"
import "./task.css"

export default class TaskList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="content">
          <div className="taskButton">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push("/tasks/new")
              }}
            >
              Create Task
            </button>
          </div>
          <h1 className="pageTitle">My Tasks</h1>
          <section className="tasks">
            {this.props.tasks.map(task => (
              <div key={task.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Task: {task.taskName}
                    </h5>
                    <h5>
                      Target Finish Date: {task.targetDate}
                    </h5>
                    <button
                      onClick={() => this.props.deleteTask(task.id)}
                      className="btn btn-success">
                      Delete
                    </button>
                    <button
                      onClick={() => this.props.editTask(task.id)}
                      className="btn btn-success">
                      Edit
                    </button>
                </div>
              </div>
            ))
            }
          </section>
        </section>
      </React.Fragment>
    )
  }
}