import React from 'react';
import axios from 'axios';

class TasksPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId: null,
            getTasks: false,
            tasks: [],
        };
      }
    
      typingTimer = null;
    
      componentDidMount() {
        if (!this.state.userId) {
          this.getUserId();
        }
      }
    
      getUserId() {
        axios.get(`http://localhost:8080/api/user_data`)
        .then((response) => {
          this.setState({userId: response.data.id})
        })
      }
    
      getTasks() {
        axios.get(`http://localhost:8080/api/tasks/` + this.state.userId)
        .then((response) => {
            this.setState({getTasks: true})
            this.setState({tasks: response.data})
          })
      }
  render() {
    if (!this.state.getTasks && this.state.userId) {
        this.getTasks();
      }
      let tasks
      if (this.state.tasks !== {}) {
        tasks = this.state.tasks.map((task, index) => 
            index < 3 ?
            <p>{task.task}</p>
            : null
          );
      }
    return (
        <React.Fragment>
            {tasks}
        </React.Fragment>
    );
  }
}

export default TasksPreview;