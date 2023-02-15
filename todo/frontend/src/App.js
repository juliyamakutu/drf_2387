import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': []
      }
  }

  componentDidMount() {
    const users = [
      {
        'first_name': 'Фёдор',
        'last_name': 'Достоевский',
        'email_address': '1821@mail.ru'
      },
      {
        'first_name': 'Александр',
        'last_name': 'Грин',
        'email_address': '1880@mail.ru'
      },
    ]
    this.setState(
      {
        'users': users
      }
    )
  }

  render () {
    return (
      <div>
        <UserList users={this.state.users} />
      </div>
    )
  }
}

export default App;
