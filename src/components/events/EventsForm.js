import React, { Component } from "react"

export default class EventForm extends Component {
    //Set initial state
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        url: "",
        userId: ""
    };
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    };
    constructNewEvent = event => {
        event.preventDefault();
        const newEvent = {
            name: this.state.eventName,
            date: this.state.eventDate,
            location: this.state.eventLocation,
            url: this.state.url,
            userId: this.state.userId
        };
        //create the event and reirect user to events list
        this.props
            .addEvent(event)
            .then(() => this.props.history.push(""))

    }
}
