import { withRouter } from "react-router"
import { Route, Redirect } from "react-router-dom"
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
import EditEventForm from "./events/EditEventForm"
import EventManager from "./events/EventManager"
import EventList from "./events/EventsList"
import EventForm from "./events/EventsForm"
// import Event from "./events/Events"
import ChatManager from "./chat/ChatManager"
import ChatList from "./chat/ChatList"
import ChatEditForm from "./chat/ChatEditForm"
import UserManager from "./users/UserManager"
import FriendManager from "./friends/FriendManager"
// import FriendLists from "./friends/FriendList"
// import FriendForm from "./friends/FriendForm"
// import Friend from "./friends/Friend"
import Login from "./login/Login"
import LoginForm from "./login/LoginForm";
import DashBoardList from "./dashboard/DashBoardList"

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null
 
  state = {
    users: [],
    messages: [],
    articles: [],
    friends: [],
    tasks: [],
    events: [],
    userId: []
  }

  componentDidMount() {
    this.userSpecificData()
  }

  userSpecificData = () => {
    const newState = {}
    let currentUserId = sessionStorage.getItem("userId")
    UserManager.getAll(currentUserId).then(users => (newState.users = users))
    .then(() => ArticleManager.getAll(currentUserId).then(articles => (newState.articles = articles)))
    .then(() => ChatManager.getAll(currentUserId).then(messages => newState.messages = messages))
    .then(() => FriendManager.getAll(currentUserId).then(friends => (newState.friends = friends)))
    .then(() => TaskManager.getAll(currentUserId).then(tasks => (newState.tasks = tasks)))
    .then(() => EventManager.getAll(currentUserId).then(events => (newState.events = events)))
    .then(() => this.setState(newState))
  }

  onLogin = () => {
    this.userSpecificData()
  }

  onLogout = () => {
    sessionStorage.clear()
  }

  addTask = task => {
    return TaskManager.postTask(task)
    .then(() => this.userSpecificData())
  }
  

  deleteTask = id => {
    return TaskManager.removeAndList(id).then(tasks => {
      this.props.history.push("/tasks")
      this.setState({tasks: tasks})
      this.userSpecificData()
    })
  }

  updateTask = editedTaskObject => {
    return TaskManager.put(editedTaskObject)
      .then(() => this.userSpecificData())
  }

  completeTask = completedTaskObject => {
    return TaskManager.patch(completedTaskObject)
    .then(() => this.userSpecificData())
  }

  addEvent = event => {
    return EventManager.postEvent(event)
    .then(() => this.userSpecificData())
  }

  deleteEvent = id => {
    return EventManager.delete(id)
    .then(() => this.userSpecificData())
  }

  updateEvent = editedEventObject => {
    return EventManager.putEvent(editedEventObject)
      .then(() => this.userSpecificData())
  }
  addArticle = article => {
    return ArticleManager.postArticle(article)
    .then(() => this.userSpecificData())
  }

  deleteArticle = id => {
    return ArticleManager.delete(id)
    .then(() => this.userSpecificData())
  }

  updateArticle = editiedArticle => {
    return ArticleManager.putArticle(editiedArticle)
    .then(() => this.userSpecificData())
  }

  addMessage = message => {
    return ChatManager.postMessage(message)
    .then(() => this.userSpecificData())
  }

  updateMessage = editedMessage => {
    return ChatManager.patchMessage(editedMessage)
    .then(() => this.userSpecificData())
  }

  addUser = user =>
    UserManager.postUser(user)

  render() {
    return (
      <React.Fragment>
        <Route 
        exact 
        path="/" 
        render={props => {
          return <Login {...props} 
          onLogin={this.onLogin} 
          userSpecificData={this.userSpecificData} 
           />
        }}
        />
        <Route 
        exact 
        path="/login/new" 
        render={props => {
          return <LoginForm {...props} 
          addUser={this.addUser} 
          onLogin={this.onLogin} 
          userSpecificData={this.userSpecificData}
            />    
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
        exact
        path="/messages" 
        render={props => { 
          if (this.isAuthenticated()) {
            return <ChatList {...props} 
            messages={this.state.messages} 
            addMessage={this.addMessage} 
            users={this.state.users} 
           />
          } else {
            return <Redirect to="/" />
          }
          }}
        />
        <Route
          exact
          path="/messages/:messageId(\d+)/edit"
          render={props => {
            return <ChatEditForm {...props} 
            updateMessage={this.updateMessage} 
            />
          }}
        />
        <Route
          exact
          path="/events"
          render={props => {
            if (this.isAuthenticated()) {
            return <EventList
                {...props}
                events={this.state.events} 
                deleteEvent={this.deleteEvent}
                userSpecificData={this.userSpecificData}
              />
            } else {
              return <Redirect to="/" />
            }
          }}
        />
        <Route
          exact
          path="/events/new"
          render={props => {
            return <EventForm {...props} 
            addEvent={this.addEvent} 
            userSpecificData={this.userSpecificData} 
            />
          }}
        />
        <Route 
        exact 
        path="/events/:eventId(\d+)/edit"
          render={props => {
            return <EditEventForm {...props} 
            updateEvent={this.updateEvent} 
            userSpecificData={this.userSpecificData} 
            />
          }}
        />
        <Route
          exact
          path="/tasks"
          render={props => {
            if (this.isAuthenticated()) {
            return <TaskList {...props} 
            completeTask={this.completeTask} 
            deleteTask={this.deleteTask}
            tasks={this.state.tasks} 
            userSpecificData={this.userSpecificData}
              />
            } else { 
            return <Redirect to="/" 
            />
          }
          }}
        />
        <Route
          path="/tasks/new"
          render={props => {
            return <TaskForm {...props} 
            addTask={this.addTask} 
            userSpecificData={this.userSpecificData} 
            />
          }}
        />
        <Route
          exact
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return <TaskEditForm {...props} 
              updateTask={this.updateTask} 
              userSpecificData={this.userSpecificData} 
              />
          }}
        />
        <Route
          exact
          path="/articles"
          render={props => {
            if (this.isAuthenticated()) {
            return <ArticleList {...props} 
            articles={this.state.articles} 
            deleteArticle={this.deleteArticle} 
            userSpecificData={this.userSpecificData}
            />
            } else { 
            return <Redirect to="/" 
            />
          }
          }}
        />
        <Route
          path="/articles/new"
          render={props => {
            return <ArticleForm {...props}
             addArticle={this.addArticle}
             userSpecificData={this.userSpecificData}
             />
          }}
        />
        <Route
          exact
          path="/articles/:articleId(\d+)/edit"
          render={props => {
            return <ArticleEditForm {...props} 
            updateArticle={this.updateArticle} 
            userSpecificData={this.userSpecificData} 
            />
          }}
        />
        <Route 
        exact 
        path="/dashboard" 
        render={props => {
          return <DashBoardList {...props}
          articles={this.state.articles}
          tasks={this.state.tasks} 
          />
        }}
        />
      </React.Fragment>
    )
  }
}
export default withRouter(ApplicationViews)