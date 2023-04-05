import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: '', created_by: props.created_by[0]?.id};
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.title, this.state.created_by);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                        <input type="text" name="title" className="form-control" title="title" value={this.state.title} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="created_by">Created by</label>
                        <select type="text" className="form-control" name="created_by" value={this.state.created_by} onChange={(event)=>this.handleChange(event)}>
                            {this.props.created_by.map((item) => <option value={item.id}>{item.created_by}</option>)}
                        </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm
