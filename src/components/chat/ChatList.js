import React, { Component } from "react"
import ChatSendMessage from "./ChatSendMessage";
import "./ChatList.css;"

export default class ChatList extends Component {
    render() {
        console.log(this.props.users);
        return (
            <React.Fragment>
                <section className="messages">
                    <div className="list-group message__box">
                        {
                            this.props.messages.map(message =>
                                <div key={message.id} className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {this.props.users.find(user => user.id === message.userId
                                            ).userName}
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