import React from 'react';
import axios from 'axios';
import styles from './styles/tasks-page.module.css'; 
import { Grid, Row, Col } from 'react-flexbox-grid';

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        userId: null,
        getTasks: false,
        tasks: [],
        newTask: ''
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

  taskHandler = (event) => {
    let id = event.target.id
    let task = event.target.value
    const val = event.target.value;
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
    if (val) {
      this.putTask(id, task, false)
    }
    }, 500);
  }

  completeHandler = (event) => {
    let id = event.target.id
    let checked = event.target.checked
    let task
    this.state.tasks.map((task, index) => 
      task.id === id ?
      task = task.task : null
    );
    if (checked) {
      this.putTask(id, task, true);
      this.setState(this.state);
    }
    else {
      this.putTask(id, task, false);
      this.setState(this.state);
    }
  }

  newTaskHandler = (event) => {
    let task = event.target.value
    this.setState({newTask: task})
  }

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.newTask) {
      this.postTask(this.state.newTask)
      }
    this.setState({getTasks: false})
    }

  postTask(task) {
    axios.post(`http://localhost:8080/api/task`, {
      task: task,
      complete: false,
      user_id: this.state.userId
      })
      .then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.setState(this.state);
        }
      })
  }

  putTask(id, task, complete) {
    axios.put(`http://localhost:8080/api/task/` + id, {
      task: task,
      complete: complete,
      user_id: this.state.userId
      })
      .then(res => {
        // console.log(res)
      })
  }

  render() {
    if (!this.state.getTasks && this.state.userId) {
      this.getTasks();
    }
    let inputs
    let checkboxes
    if (this.state.tasks !== {}) {
      inputs = this.state.tasks.map((task, index) => 
          <Row className={styles.input}>
          <Col xs={12} >
          <form><input
          type='text'
          id= {task.id}
          placeholder = {task.task}
          onChange={this.taskHandler}
          />
          </form>
          </Col>
          </Row>
        );
      checkboxes = this.state.tasks.map((task, index) =>
          task.complete === true ?
          <Row className={styles.checkbox}>
          <Col xs={12} >
          <form>
          <input 
              type="checkbox" 
              id={task.id}
              onChange={this.completeHandler}
              checked={task.complete}
            />
            </form> 
            </Col>
            </Row>:
            <Row className={styles.checkbox}>
            <Col xs={12} >
            <form><input 
              type="checkbox" 
              id={task.id}
              onChange={this.completeHandler}
            />
            </form>
            </Col>
            </Row>
        );
    }

    return (
    <React.Fragment>
        <Row className={styles.title}>
        <Col >
            <h1>Tasks</h1>
        </Col>
        </Row>
      <Row className={styles.wrapper}>
        <Col xs={8} >
          {inputs}
        </Col>
        <Col xs={4}>    
          {checkboxes}
        </Col>
          <form onSubmit={this.submitHandler}>
          <p>Add new task</p>
            <input
            type='text'
            onChange={this.newTaskHandler}
            />
            <input
              type='submit'
            />
          </form>
        </Row>
    </React.Fragment>
    );
  }
}

export default TasksPage ;