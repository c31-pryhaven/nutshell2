import React, { Component } from "react";

export default class chatSendMessage extends Component {
    //initial message state.
    state = {
        message: "",
        userId: "1",
    };

    handleMessageInput = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
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

            this.props.addMessage(message)
        }
    };

    render() {
        return (
            <React.Fragment>
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
                        onClick={this.constructNewMessage}
                    >
                        Send Message
                    </button>
                </div>
            </React.Fragment>
        )
    }
}
