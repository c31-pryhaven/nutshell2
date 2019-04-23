import React, { Component } from "react"
import "./task.css"

export default class TaskList extends Component {
  handleCompleteTask = (id) => {

    const object = {
      isComplete: true,
      id: id
    }
    this.props.completeTask(object)
  }
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
                  <h5 className="card-title">Task: {task.taskName}</h5>
                  <h5>Target Finish Date: {task.targetDate}</h5>
                  <label>
                    Click CheckBox if Complete: 
                  <input type="checkbox"
                    onClick={() => this.handleCompleteTask(task.id)}
                    className="btn btn-success"
                  />
                  </label>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      this.props.history.push(
                        `/tasks/${task.id}/edit`
                      )
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}          
          </section>
        </section>
      </React.Fragment>
    )
  }
}