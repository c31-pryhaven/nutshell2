import React, { Component } from "react"
import ChatSendMessage from "./ChatSendMessage";
import './ChatList.css'

export default class ChatList extends Component {
    appendEditButton = (message) => {
        if (this.currentuserId === message.userId){
        return <button className="editButton"
            onClick={() => {
                this.props.history.push(`/messages/${message.id}/edit`)
            }}>Edit</button>
        }
    }

    scrollToBottom = () => {
        if (this.messageBox) {
            this.messageBox.scrollTop = this.messageBox.scrollHeight;
            console.log(this.messageBox.scrollTop, this.messageBox.scrollHeight)
        }
    }

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <article className="messages">
                    <section className="list-group message__box" ref={(el) => { this.messageBox = el; }}>
                        {
                            this.props.messages.map(message =>
                                <div key={message.id} className="card list-group-item">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {this.props.users.find(user => user.id === message.userId
                                            ).userName}
                                        </h5>
                                        <p className="card-text">{message.message}</p>
                                        {this.appendEditButton(message)}
                                </div>
                                </div>
                    )
                }
                    </section>
                    <section className="send-message">
                        <ChatSendMessage {...this.props} />
                    </section>
                </article>
            </React.Fragment>
        )
    }
}