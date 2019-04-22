import React, { Component } from "react"

export default class ChatList extends Component {
    //initial message state.
    state = {
        message: "",
        userId: "1",
    };

    handleMessageInput = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
        console.log(this.state);
    };

    constructNewMessage = event => {
        event.preventDefault();
        if (this.state.message === "") {
            window.alert("Please enter a message.");
        } else {
            const message = {
                message: this.state.message,
                userId: parseInt(this.state.userId)
            };

            // this.props
            //     .addAnimal(animal)
            //     .then(() => this.props.history.push("/animals"));
        }
    };

    // addMessage = message =>
    //     ChatManager.post(message)
    //         .then(() => ChatManager.getAll())
    //         .then(messages =>
    //             this.setState({
    //                 messages: messages
    //             })
    //         )

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
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleMessageInput}
                            id="message"
                            placeholder="new message"
                        />
                    </div>
                    <div className="sendButton">
                        <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                // this.props.addMessage(this.state)
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