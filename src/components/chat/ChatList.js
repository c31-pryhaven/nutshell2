import React, { Component } from "react"

export default class ChatList extends Component {
    render(){
        console.log(this.props.messages);
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
            </React.Fragment>
        )
    }
}