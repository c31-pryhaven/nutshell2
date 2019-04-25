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
import EditEventForm from "./events/EditEventForm"
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
import LoginForm from "./login/LoginForm";
import DashBoardList from "./dashboard/DashBoardList"
let currentUserId = sessionStorage.getItem("userId")
class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null
  currentUserId = sessionStorage.getItem("userId")
  
  state = {
    users: [],
    messages: [],
    articles: [],
    friends: [],
    tasks: [],
    events: [],
    userId: ""
  }
  
  componentDidMount() {
    this.userSpecificData()
  }

  userSpecificData = () => {
    const newState = {}
    let currentUserId = sessionStorage.getItem("userId")
    UserManager.getAll().then(users => (newState.users = users))
    .then(() => ArticleManager.getAll(currentUserId).then(articles => (newState.articles = articles)))
    .then(() => ChatManager.getAll().then(messages => newState.messages = messages))
    .then(() => FriendManager.getAll().then(friends => (newState.friends = friends)))
    .then(() => TaskManager.getAll(currentUserId).then(tasks => (newState.tasks = tasks)))
    .then(() => EventManager.getAll().then(events => (newState.events = events)))
    .then(() => this.setState(newState))
  }
  onLogin = () => {
    this.setState({
    userId: sessionStorage.getItem("userId")
    })
  }
  
  addTask = task =>
  TaskManager.postTask(task)
  .then(() => TaskManager.getAll(currentUserId))
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
      this.props.history.push("/events");
      this.setState({ events: events });
      this.userSpecificData()
    });
  };

  updateEvent = editedEventObject => {
    return EventManager.putEvent(editedEventObject)
        .then(() => EventManager.getAll())
        .then(events => {
          this.setState({
            events : events
          })
        })
  }
  addArticle = article =>
    ArticleManager.postArticle(article)
      .then(() => ArticleManager.getAll(currentUserId))
      .then(article =>
        this.setState({
          articles: article
        })
      )

  deleteArticle = id => {
    return ArticleManager.removeAndList(id).then(articles => {
      this.props.history.push("/articles")
      this.setState({ articles: articles })
      this.userSpecificData()
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

      addUser = user =>
      UserManager.postUser(user)


  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Login onLogin={this.onLogin} userSpecificData={this.userSpecificData} {...props} />
        }}
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
                userSpecificData={this.userSpecificData}
                
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
            return <ChatList {...props} messages={this.state.messages} addMessage={this.addMessage} users={this.state.users} />
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
                events={this.state.events} userSpecificData={this.userSpecificData}
              />
            )
          }}
        />
        <Route
          exact
          path="/events/new"
          render={props => {
            return <EventForm {...props} addEvent={this.addEvent} userSpecificData={this.userSpecificData} />
          }}
        />
        <Route exact path ="/events/:eventId(\d+)/edit"
          render={props => {
            return (
              <EditEventForm {...props} updateEvent={this.updateEvent} userSpecificData={this.userSpecificData} />
            )
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
                userSpecificData={this.userSpecificData}
              />
            )
          }}
        />
        <Route
          path="/tasks/new"
          render={props => {
            return <TaskForm {...props} addTask={this.addTask} userSpecificData={this.userSpecificData} />
          }}
        />
        <Route
          exact
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return (
              <TaskEditForm {...props} updateTask={this.updateTask} userSpecificData={this.userSpecificData} />
            )
          }}
        />
        <Route
          path="/articles/new"
          render={props => {
            return <ArticleForm {...props} addArticle={this.addArticle} userSpecificData={this.userSpecificData} />
          }}
        />
        <Route
          exact
          path="/articles/:articleId(\d+)/edit"
          render={props => {
            return (
              <ArticleEditForm {...props} updateArticle={this.updateArticle} userSpecificData={this.userSpecificData} />
            )
          }}
        />
        <Route 
        exact path="/login/new" render={props => {
          return (
            <LoginForm {...props} addUser={this.addUser}/>
          )
        }}
        />
        <Route exact path="/dashboard" render={props => {
          return (
            <DashBoardList {...props}
            articles={this.state.articles}
            tasks={this.state.tasks}/>
          )
        }}
        />
      </React.Fragment>
    )
  }
}
export default withRouter(ApplicationViews)
