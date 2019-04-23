import React, { Component } from "react"
import ChatSendMessage from "./ChatSendMessage";

export default class ChatList extends Component {
    render() {
        return (
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
                <section className="send-message">
                <ChatSendMessage {...this.props} />
                </section>
            </React.Fragment>
        )
    }
}