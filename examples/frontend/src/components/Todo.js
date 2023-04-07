import React from 'react'
import { Link } from 'react-router-dom'


const TodoItem = ({todo, deletTodo}) => {
    return (
        <div>
             <tr>
                <td>{todo.id}</td>
                <td>{todo.project}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.created_at}</td>
                <td>{todo.updated_at}</td>
                <td>{todo.created_by.username}</td>
                <td><input type="checkbox" checked={todo.completed}></input></td>
                <td><button onClick={()=>deletTodo(todo.id)} type='button'>Delete</button></td>
            </tr> 
        </div>              
    )
}


const TodoList = ({todos, deletTodo}) => {
    return (
        <div>
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
                    <th>Delete</th>
                </tr>    
                {todos.map((todo) => <TodoItem todo={todo} deletTodo={deletTodo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}


export default TodoList