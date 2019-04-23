import React, { Component } from "react"
import "./task.css"

export default class TaskForm extends Component {
  // Set initial state for tasks
  state = {
    taskName: "",
    targetDate: ""
  }

  // Update tasks state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
    // Local method for validation, creating a task object, and
    // invoking the function reference passed from parent component

  constructNewTask = evt => {
    evt.preventDefault()
    if (this.state.task === "") {
      window.alert("Please enter a task")
    } else {
      const task = {
        taskName: this.state.taskName,
        targetDate: this.state.targetDate,
        isComplete: false,
        userId: ""
      }
      // Create the task and redirect user to the task list
      this.props
        .addTask(task)
        .then(() => this.props.history.push("/tasks"))
    }
  }

  // Create form components and capture user inputs when submit is clicked
  render() {
    return (
      <React.Fragment>
        <section className="content">
          <form className="taskForm">
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="taskName"
                placeholder="Task Name?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="targetDate">Task Target Finish Date</label>
              <input
                type="date"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="targetDate"
                placeholder="Task Finish Target Date?"
              />
            </div>
            <button
              type="submit"
              onClick={this.constructNewTask}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </section>
      </React.Fragment>
    )
  }
}