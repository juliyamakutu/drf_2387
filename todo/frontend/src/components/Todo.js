import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.created_at}</td>
            <td>{todo.updated_at}</td>
            <td>{todo.created_by.username}</td>
            <td><input type="checkbox" checked={todo.completed}></input></td>
        </tr>
    )
}


const TodoList = ({todos}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Created by</th>
                <th>Completed</th>
            </tr>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}


export default TodoList