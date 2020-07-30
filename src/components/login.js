import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './styles/login.module.css'; 

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        username: '',
        password: '',
        unauthorizedUser: false
    };
  }

  usernameHandler = (event) => {
    this.setState({username: event.target.value});
  }

  passwordHandler = (event) => {
    this.setState({password: event.target.value});
  }

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.username !== "" && this.state.password !== "" && this.state.username.includes("@")) {
        axios.post(`http://localhost:8080/api/login`, {
            email: this.state.username,
            password: this.state.password
        })
        .then(res => {
            this.props.history.push(res.data)
        })
        .catch((error) =>  {
          if (error.response) {
            if (error.response.status === 401) {
              this.setState({unauthorizedUser: true})
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
      
        });
    }
  }

  render() {
    let badLogin
    if (this.state.unauthorizedUser) {
      badLogin = <p>Sorry, incorrect username or password</p>
    }
    return (
      <React.Fragment>
      <Row className={styles.wrapper}>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={8}>
              <Row> 
                <Col xs={12}>
                <h1>Dev challenge</h1>
                </Col>
              </Row>
            <form onSubmit={this.submitHandler}>
            <Row> 
                <Col xs={6}>
                  <input
                  placeholder='Email'
                  type='text'
                  onChange={this.usernameHandler}
                  />
                </Col>
                <Col xs={6}>
                  <input
                  placeholder='Password'
                  type='password'
                  onChange={this.passwordHandler}
                  />
                </Col>
            </Row>
            <Row> 
                <Col xs={12}>
                  <input
                    type='submit'
                  />
                </Col>
            </Row>
            </form>
            <Row> 
                <Col xs={12}>
                <div>
                  <Link to="/signup">New to the challenge? Sign up</Link>
                </div>
                </Col>
            </Row>
            <Row> 
                <Col xs={12}>
                <div>
                  {badLogin}
                </div>
                </Col>
            </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default Login ;