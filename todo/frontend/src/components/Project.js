import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.title}</td>
            <td>{project.description}</td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList