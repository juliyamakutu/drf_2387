import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import UserTodoList from './components/UserTodo.js';
import {BrowserRouter, Route, Link, Routes, Navigate} from 'react-router-dom';
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';


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
      "todos": [],
      'token': '',
      }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
          this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
      let headers = {
        'Content-Type': 'application/json'
      }

    if (this.is_authenticated())
      {
        headers['Authorization'] = 'Token ' + this.state.token
      }
      return headers
  }

  load_data() {
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {
      const users = response.data.results
      this.setState(
            {
              "users": response.data
          }
        )}).catch(error => {
          console.log(error)
          this.setState({users: []})
        })
    
    axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
        const projects = response.data.results
      this.setState(
            {
              "projects": response.data
          }
        )}).catch(error => {
          console.log(error)
          this.setState({projects: []})
        })

    axios.get('http://127.0.0.1:8000/api/todos/', {headers}).then(response => {
        const todos = response.data.results
      this.setState(
            {
              "todos": response.data
          }
        )}).catch(error => {
          console.log(error)
          this.setState({todos: []})
        })
  }

  componentDidMount() {

    this.get_token_from_storage()
    this.load_data()
    
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
            <li>
              {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
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
            <Route element={NotFound404} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
