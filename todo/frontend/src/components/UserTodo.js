import React from 'react'
import { useParams } from 'react-router-dom'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.created_by.username}</td>
        </tr>
    )
}


const UserTodoList = ({todos}) => {
    let { id } = useParams();
    let filtered_todos = todos.filter((todo) => todo.created_by.id === id)
    return (
        <table>
            <tr>
                <th>ID  </th>
                <th>Title</th>
                <th>User</th>
            </tr>
            {filtered_todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default UserTodoList