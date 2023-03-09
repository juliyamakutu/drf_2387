import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.title}</td>
            <td>{project.description}</td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Users</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList