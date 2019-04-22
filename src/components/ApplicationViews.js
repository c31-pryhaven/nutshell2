import { Route } from "react-router-dom";
import React, { Component } from "react";
import ArticleList from "./articles/ArticlesList"
import ArtricleManager from "./articles/ArticlesManager"
import ArticleForm from "./articles/ArticlesForm"
import ArticlesManager from "./articles/ArticlesManager";
// import Article from "./articles/Articles"
// import TaskManager from "./tasks/TaskManager"
// import TaskList from "./tasks/TaskList"
// import TaskForm from "./tasks/TaskForm"
// import Task from "./tasks/Task"
// import EventsManager from "./events/EventManager"
// import EventsList from "./events/EventsList"
// import EventsForm from "./events/EventsForm"
// import Event from "./events/Events"
// import ChatManager from "./chat/ChatManager"
// import ChatList from "./chat/ChatList"
// import ChatForm from "./chat/ChatForm"
// import Chat from "./chat/Chat"
// import FriendManager from "./friends/FriendManager"
// import FriendLists from "./friends/FriendList"
// import FriendForm from "./friends/FriendForm"
// import Friend from "./friends/Friend"









export default class ApplicationViews extends Component {

  state = {
    articles: [],
    tasks: [],
    events: [],
    chat: [],
    freinds: []
  }


componentDidMount() {
  const newState = {}

    ArticlesManager.getAll()
    .then(articles =>newState.articles = articles)
}

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return null
            // Remove null and return the component which will handle authentication
          }}
        />

        <Route
          exact path="/articles" render={props => {
            return 
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's events
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
