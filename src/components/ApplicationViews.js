import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import React, { Component } from "react"
import ArticleList from "./articles/ArticlesList"
import ArticleManager from "./articles/ArticleManager"
import ArticleForm from "./articles/ArticlesForm"
import ArticleEditForm from "./articles/ArticleEditForm"
// import Article from "./articles/Articles"
import TaskManager from "./tasks/TaskManager"
import TaskList from "./tasks/TaskList"
import TaskForm from "./tasks/TaskForm"
import TaskEditForm from "./tasks/TaskEditForm"
// import Task from "./tasks/Task"
import EventManager from "./events/EventManager"
import EventList from "./events/EventsList"
import EventForm from "./events/EventsForm"
// import Event from "./events/Events"
import ChatManager from "./chat/ChatManager"
import ChatList from "./chat/ChatList"
// import ChatForm from "./chat/ChatForm"
// import Chat from "./chat/Chat"
import UserManager from "./users/UserManager"
import FriendManager from "./friends/FriendManager"
// import FriendLists from "./friends/FriendList"
// import FriendForm from "./friends/FriendForm"
// import Friend from "./friends/Friend"
import Login from "./login/Login"

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  state = {
    users: [],
    messages: [],
    articles: [],
    friends: [],
    tasks: [],
    events: []
  }

  componentDidMount() {
    const newState = {}

    ChatManager.getAll().then(messages => (newState.messages = messages))
    ArticleManager.getAll().then(articles => (newState.articles = articles))
    UserManager.getAll().then(users => newState.users = users)
    FriendManager.getAll().then(friends => (newState.friends = friends))
    TaskManager.getAll().then(tasks => (newState.tasks = tasks))
    EventManager.getAll().then(events => (newState.events = events))
      .then(() => this.setState(newState))
  }

  addTask = task =>
    TaskManager.postTask(task)
      .then(() => TaskManager.getAll())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )

  deleteTask = id => {
    return TaskManager.removeAndList(id).then(tasks => {
      this.props.history.push("/tasks")
      this.setState({
        tasks: tasks
      })
    })
  }

  updateTask = editedTaskObject => {
    return TaskManager.put(editedTaskObject)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({
          tasks: tasks
        })
      })
  }

  completeTask = completedTaskObject => {
    return TaskManager.patch(completedTaskObject)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({
          tasks: tasks
        })
      })
  }

  addEvent = event =>
    EventManager.postEvent(event)
      .then(() => EventManager.getAll())
      .then(events =>
        this.setState({
          events: events
        })
      )

  deleteEvent = id => {
    return EventManager.removeAndList(id).then(events => {
      this.props.history.push("/events")
      this.setState({ events: events })
    })
  }
  addArticle = article =>
    ArticleManager.postArticle(article)
      .then(() => ArticleManager.getAll())
      .then(article =>
        this.setState({
          articles: article
        })
      )

  deleteArticle = id => {
    return ArticleManager.removeAndList(id).then(articles => {
      this.props.history.push("/articles")
      this.setState({ articles: articles })
    })
  }

  updateArticle = editiedArticle => {
    return ArticleManager.putArticle(editiedArticle)
      .then(() => ArticleManager.getAll())
      .then(article => {
        this.setState({
          articles: article
        })
      })
  }

  addMessage = message =>
    ChatManager.postMessage(message)
      .then(() => ChatManager.getAll())
      .then(message =>
        this.setState({
          messages: message
        })
      )

  render() {
    return (
      <React.Fragment>
        <Route exact path="/"
          component={Login} return null
        />
        <Route
          exact
          path="/articles"
          render={props => {
            return (
              <ArticleList
                {...props}
                articles={this.state.articles}
                deleteArticle={this.deleteArticle}
              />
            )
          }}
        />
        <Route
          path="/friends"
          render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />
        <Route
          path="/messages" render={props => {
            return <ChatList messages={this.state.messages} addMessage={this.addMessage} users={this.state.users} />
          }}
        />
        <Route
          exact
          path="/events"
          render={props => {
            return (
              <EventList
                {...props}
                deleteEvent={this.deleteEvent}
                events={this.state.events}
              />
            )
          }}
        />
        <Route
          exact
          path="/events/new"
          render={props => {
            return <EventForm {...props} addEvent={this.addEvent} />
          }}
        />
        <Route
          exact
          path="/tasks"
          render={props => {
            return (
              <TaskList
                {...props}
                completeTask={this.completeTask}
                deleteTask={this.deleteTask}
                tasks={this.state.tasks}
              />
            )
          }}
        />
        <Route
          path="/tasks/new"
          render={props => {
            return <TaskForm {...props} addTask={this.addTask} />
          }}
        />
        <Route
          exact
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return (
              <TaskEditForm {...props} updateTask={this.updateTask} />
            )
          }}
        />
        <Route
          path="/articles/new"
          render={props => {
            return <ArticleForm {...props} addArticle={this.addArticle} />
          }}
        />
        <Route
          exact
          path="/articles/:articleId(\d+)/edit"
          render={props => {
            return (
              <ArticleEditForm {...props} updateArticle={this.updateArticle} />
            )
          }}
        />
      </React.Fragment>
    )
  }
}
export default withRouter(ApplicationViews)
