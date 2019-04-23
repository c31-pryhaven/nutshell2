import React, { Component } from "react"
import TaskManager from "./TaskManager"

export default class TaskEditForm extends Component {
    // Set initial state
    state = {
      taskName: "",
      targetDate: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTask = evt => {
      evt.preventDefault()

        const editedTask = {
          id: Number(this.props.match.params.taskId),
          taskName: this.state.taskName,
          targetDate: this.state.targetDate
        }

    this.props.updateTask(editedTask)
    .then(() => this.props.history.push("/tasks"))      
    }
  
    componentDidMount() {
      TaskManager.get(this.props.match.params.taskId)
      .then(task => {
        console.log(this.props)
        this.setState({
          taskName: task.taskName,
          targetDate: task.targetDate
        })
      })
    }

    render() {
      return (
        <React.Fragment>
          <form className="taskForm">
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="taskName"
                value = {this.state.taskName}
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
              onClick={this.updateExistingTask}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}