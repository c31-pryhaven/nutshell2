import React, { Component } from "react"
// import { Link } from "react-router-dom"
import './event.css'

//List all events
export default class EventList extends Component {

    addNextEventClass = (event, nextEvent) => {
        if(event.eventDate === nextEvent.eventDate) {
            return "nextEvent"
        } else {
            return ""
        }

    }
    render() {
        let sortedEventsArray = this.props.events.sort((a, b) => {
            const dateA = Date.parse(a.eventDate)
            const dateB = Date.parse(b.eventDate)
            return dateB - dateA
        })
        let nextEvent = sortedEventsArray[0]
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
                        sortedEventsArray.map(event =>
                            <div key={event.id} className={`card ${this.addNextEventClass(event,nextEvent)}`}>
                                <div className="card-body" >
                                    <h5 className={`card-title ${this.addNextEventClass(event,nextEvent)}`}>Event: {event.eventName}</h5>
                                    <h5 className={`card-title ${this.addNextEventClass(event,nextEvent)}`}>Date: {event.eventDate}</h5>
                                    <h5 className={`card-title ${this.addNextEventClass(event,nextEvent)}`}>Location: {event.eventLocation}</h5>
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
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}