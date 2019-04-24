import React, { Component } from "react"

export default class LoginForm extends Component {
    state = {
        userName: "",
        email: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
    };

    newUser = event => {
        event.preventDefault();
        const user = {
            userName: this.state.userName,
            email: this.state.email
        };
        this.props.addUser(user).then(() => this.props.history.push("/users"))
        
    }


render() {
    return (
        <React.Fragment>
                <form className="card">
                <div className="form-group">
                <label htmlFor="userName">User Name</label>
                <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="userName"
                            placeholder="user name"
                        />
                <label htmlFor="email">Email:</label>
                <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="email"
                            placeholder="email"
                        />
                        <button
                            type="submit"
                            onClick={this.newArticle}
                            className="btn btn-primary"
                            >
                            Submit</button>
                    </div>
                </form>
            </React.Fragment>
    )
}
}