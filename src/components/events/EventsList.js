import React, { Component } from "react"
// import { Link } from "react-router-dom"
import './event.css'

//List all events
export default class EventList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="eventButton">
                    <button className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/events/new")
                        }
                        }>
                        New Event
                        </button>
                </div>
                <section className="content events">
                    {
                        this.props.events.map(event =>
                            <div key={event.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Event: {event.eventName}</h5>
                                    <h5 className="card-title">Date: {event.eventDate}</h5>
                                    <h5 className="card-title">Location: {event.eventLocation}</h5>
                                </div>
                                <div>
                                    <button className="deleteButton"
                                        onClick={() => {
                                            this.props.deleteEvent(event.id)
                                        }}>Delete</button>
                                    <button className="editButton"
                                            onClick={() => {
                                                this.props.history.push(`/events/${event.id}/edit`)
                                            }}>Edit</button>
                                </div>
                            </div>)
                    }
                </section>
            </React.Fragment>
        )
    }
}