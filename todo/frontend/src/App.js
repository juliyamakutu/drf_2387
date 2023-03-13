import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import UserTodoList from './components/UserTodo.js'
import {BrowserRouter, Route, Link, Routes, Navigate} from 'react-router-dom'
import LoginForm from './components/Auth.js'


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

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
      console.log(response.data)
    }).catch(error => alert('Неверный логин или пароль'))
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
      <BrowserRouter>
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
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
        </div>
          <Routes>
            <Route path='/' element={<UserList users={this.state.users} /> } Route />
            <Route path='/projects' element={<ProjectList projects={this.state.projects}  /> } Route />
            <Route path='/todos' element={<TodoList todos={this.state.todos} /> } Route />
            <Route path='/users' element={<Navigate to='/' />} Route />
            <Route path="/users/:id" element={<UserTodoList todos={this.state.todos} /> } Route />
            <Route path="/login" element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} Route />
            <Route path='/login' element={<LoginForm get_token={this.get_token} />} Route />  
            <Route element={NotFound404} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
