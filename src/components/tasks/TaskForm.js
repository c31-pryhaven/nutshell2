import React, { Component } from "react"
import "./task.css"

export default class TaskForm extends Component {
  // Set initial state
  state = {
    taskName: "",
    targetDate: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  /*
        Local method for validation, creating task object, and
        invoking the function reference passed from parent component
     */
  constructNewTask = evt => {
    evt.preventDefault()
    if (this.state.task === "") {
      window.alert("Please select a caretaker")
    } else {
      const task = {
        taskName: this.state.taskName,
        targetDate: this.state.targetDate
      }
      // Create the task and redirect user to task list
      this.props
        .addTask(task)
        .then(() => this.props.history.push("/tasks"))
    }
  }

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
            {/* <div className="form-group">
              <label htmlFor="employeeNumber">Employee Phone Number</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="employeeNumber"
                placeholder="Employee Phone Number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeAddress">Employee Phone Address</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="employeeAddress"
                placeholder="Employee Phone Address"
              />
            </div> */}
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