import React, { Component } from "react"
import EventManager from "./EventManager"

export default class EditEventForm extends Component {
    //Set initial state
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        userId: ""
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    updateExistingEvent = event => {
        event.preventDefault()
            const editedEvent = {
                id : Number(this.props.match.params.eventId),
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                eventLocation: this.state.eventLocation,
                userId: Number(sessionStorage.getItem("userId"))
            }
            this.props.updateEvent(editedEvent)
            .then(() => this.props.history.push("/events"))
    }
    componentDidMount() {
        EventManager.get(this.props.match.params.eventId)
        .then(event => {
            this.setState({
                eventName: event.eventName,
                eventDate: event.eventDate,
                eventLocation: event.eventLocation
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <form className="form-group">
                    <label htmlFor="eventName">Event Name: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventName"
                            value={this.state.eventName}
                            />
                            <label htmlFor="eventDate">Event Date: </label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventDate"
                            value={this.state.eventDate}
                            />
                            <label htmlFor="eventLocation">Event Location: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventLocation"
                            value={this.state.eventLocation}
                            />
                        <button
                            type="submit"
                            onClick={this.updateExistingEvent}
                            className="btn btn-primary">Submit</button>
                    </form>
            </React.Fragment>
        )
    }
}