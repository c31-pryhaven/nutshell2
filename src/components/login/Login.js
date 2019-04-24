import React, { Component } from "react"
import UserManager from "../users/UserManager"


export default class Login extends Component {

    state = {
        userName: "",
        email: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleLogin = (e) => {
        e.preventDefault()
        UserManager.getAll()
        .then(userList => {
            let tempUserName = userList.find(element => element.userName.toLowerCase() ===
            this.state.userName.toLowerCase() && element.email.toLowerCase() ===
            this.state.email.toLowerCase())
            if (tempUserName) {
                sessionStorage.setItem("userId", tempUserName.id)
                this.props.onLogin()
                this.props.history.push("/articles") 
            } else {
                window.alert("Not Found!")
        }})

    }

    render() {
        return (
            <form onSubmit={this.handleLogin} className="content">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="userName">
                    User Name
                </label>
                <input onChange={this.handleFieldChange} type="userName"
                    id="userName"
                    placeholder="user Name"
                    required="" autoFocus="" />
                <label htmlFor="email">
                    Email
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="email"
                    placeholder="email"
                    required="" />
                <button type="submit"
                onClick={() => 
                                this.handleLogin
                            }>
                    Sign in
                </button>
                <button type="Register"
                onClick={() => {
                                this.props.history.push("/login/new")
                            }}>
                Register</button>
            </form>
        )
    }
}