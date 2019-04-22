import React, { Component } from "react"

export default class ChatList extends Component {
    render(){
        console.log(this.props.history)
        return(
            <React.Fragment>
                <section className="messages">
                <div className="card-deck">
                    {
                        this.props.messages.map(message =>
                            <div key={message.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {message.userId}
                                    </h5>
                                    <p className="card-text">{message.message}</p>
                                </div>
                            </div>
                        )
                    }
                    </div>
                </section>
                <section className = "send-message">
                <div className="sendButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/messages/new")
                        }
                        }>
                        Send Message
                    </button>
                </div>
                </section>
            </React.Fragment>
        )
    }
}