import React, { Component } from "react"
 
export default class EventForm extends Component {
    //Set initial state
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        userId: ""
    }
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }
    constructNewEvent = event => {
        event.preventDefault();
        const newEvent = {
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            userId: Number(sessionStorage.getItem("userId"))
        }
        //create the event and reirect user to events list
        this.props.addEvent(newEvent).then(() => this.props.history.push("/events"))

    }
    //render event form when add event is clicked
    render() {
        return (
            <React.Fragment>
                <form className="eventForm">
                    <div className="form-group">
                        <label>Event name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventName"
                            placeholder="Enter an event"
                            />
                    </div>
                    <div className="form-group">
                        <label>Event Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventDate"
                            />
                    </div>
                    <div className="form-group">
                        <label>Event Location</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventLocation"
                            placeholder="Enter a location"
                            />
                    </div>
                    <button
            type="submit"
            onClick={this.constructNewEvent}
            className="btn btn-primary"
          >Submit</button>

                </form>
            </React.Fragment>
        )
    }
}

