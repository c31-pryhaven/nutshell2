import React, {
    Component
} from "react"
import ChatManager from "./ChatManager";

export default class ChatEditForm extends Component {
    //Set initial state
    state = {
        message: "",
        userId: "",
    }

    //pulls value from event to set state to the value of that event's target.
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    //passes updated message from state to the applicationViews function that puts the edited message.
    updateMessage = event => {
        event.preventDefault()
        const updatedMessage = {
            id: Number(this.props.match.params.messageId),
            message: this.state.message
        }
        this.props.updateEvent(updatedMessage)
            .then(() => this.props.history.push("/messages"))
    }
    //gets the message to be edited from the API, then sets the state to that value so that it can appear as the value in the edit text field.
    componentDidMount() {
        ChatManager.get(this.props.match.params.eventId)
            .then(chat => {
                this.setState({
                    message: chat.message,
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <form className="form-group">
                    <label htmlFor="message">Message: </label>
                        <input
                            type="textArea"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="message__editor"
                            value={this.state.message}
                            />
                        <button
                            type="submit"
                            onClick={this.updateExistingEvent}
                            className="btn btn-primary">Update Message</button>
                    </form>
            </React.Fragment>
        )
    }
}