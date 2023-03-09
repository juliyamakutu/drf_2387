import React from 'react'
import { Link } from 'react-router-dom'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`users/${user.id}`}>{user.id}</Link>
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                email address
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}
export default UserList