import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import UserTodoList from './components/UserTodo.js'
import {HashRouter, Route, Link, Routes, Navigate} from 'react-router-dom'


const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      "projects": [],
      "todos": []
      }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      this.setState(
            {
              "users": response.data
          }
        )}).catch(error => console.log(error))
    
    axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
      this.setState(
            {
              "projects": response.data
          }
        )}).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
      this.setState(
            {
              "todos": response.data
          }
        )}).catch(error => console.log(error))
  }

  render () {
    return (
      <div>
      <HashRouter>
        <div>
        <nav>
          <ul className='main-nav'>
            <li>
              <Link to='/'>Users</Link>
            </li>
            <li>
              <Link to='/projects'>Projects</Link>
            </li>
            <li>
              <Link to='/todos'>Todos</Link>
            </li>
          </ul>
        </nav>
        </div>
          <Routes>
            <Route exact path='/' element={<UserList users={this.state.users} /> } />
            <Route exact path='/projects' element={<ProjectList projects={this.state.projects}  /> } />
            <Route exact path='/todos' element={<TodoList todos={this.state.todos} /> } />
            <Route path='/users' element={<Navigate to='/' />} />
            <Route path="/users/:id" element={<UserTodoList todos={this.state.todos} /> } />
            <Route element={NotFound404} />
          </Routes>
        </HashRouter>
      </div>
    )
  }
}

export default App;
