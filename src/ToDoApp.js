import React from "react";

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todo: [],
            done: [],
            input: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    handleDelete(event) {
        
        // this.setState({
        //     todo: this.state.todo.reset()
        // });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.input !== '') {
            const newItem = {
                id: Date.now(),
                text: this.state.input
            };
            this.setState(prevState => ({
                todo: prevState.todo.concat(newItem),
                input: ''
            }));
        }
    }

    undoItem = index => {
        this.setState({
            todo: this.state.todo.concat(this.state.done[index]),
            done: this.state.done.filter((item, key) => key !== index)
        });
    };

    doItem = index => {
        this.setState({
            done: this.state.done.concat(this.state.todo[index]),
            todo: this.state.todo.filter((item, key) => key !== index)
        });

        
    };

    deleteToDoItem = (index) => {
        this.setState({
          todo: this.state.todo.filter((item, key) => key !== index)
        });
      }
    
      deleteDoneItem = (index) => {
        this.setState({
          done: this.state.done.filter((item, key) => key !== index),
        });
    }

    render() {
        return (
           
            <div className="todo-container">
                 <button className="clear-todo-list" onClick={this.handleDelete}>Clear Todo's</button>
                <div className="todo-heading">
                    <div className="todo-heading-circle">
                        <i className="fas fa-check"></i>
                    </div>
                    <h1 className="text-center">To Do List</h1>
                </div>

                <div className="todo-add">
                    <form className="todo-add-form" onSubmit={this.handleSubmit}>
                        <label className="todo-add-label" htmlFor="add-item">What are your plans for today?</label>
                        <input id="add-item" className="todo-add-item" type="text" value={this.state.input} onChange={this.handleChange} placeholder="press enter after input" />
                    </form>
                </div>

                <div className="todo-lists-container">
                    <div className="todo-list-container">
                        <h5 className="todo-subheading">
                            New Todo's &nbsp;
                            <span className="todo-percent">
                                {'' + (this.state.todo.length + this.state.done.length > 0 ? Math.round((this.state.todo.length / (this.state.todo.length + this.state.done.length) * 100) * 100) / 100 : 0) + '%'}
                            </span>
                        </h5>
                        <ToDoItems id="todo-list-todo" items={this.state.todo} toggleDone={this.doItem} delete={this.deleteToDoItem}/>
                    </div>
                    <hr></hr>
                    <div className="todo-list-container">
                        <h5 className="todo-subheading">
                            Completed Todo's: &nbsp;
                            <span className="done-percent">
                                {'' + (this.state.todo.length + this.state.done.length > 0 ? Math.round((this.state.done.length / (this.state.todo.length + this.state.done.length) * 100) * 100) / 100 : 0) + '%'}
                            </span>
                        </h5>
                        <ToDoItems id="todo-list-done" items={this.state.done} toggleDone={this.undoItem} delete={this.deleteDoneItem}/>
                    </div>
                </div>
            </div>
        );
    }
}

class ToDoItems extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={this.props.id} className="list-group">
                {this.props.items.map(
                    (item, key) => (
                        <button className="alert alert-warning alert-dismissible fade show" role="alert" key={item.id}>
                            <strong onClick={this.props.toggleDone.bind(item, key)}>{item.text}</strong>
                            <span className="delete-span" onClick={this.props.delete.bind(item, key)} aria-hidden="true">&times;</span>
                        </button>
                    )
                )}
            </div>
        );
    }
}

export default ToDoApp;
