import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './styles/signup.module.css'; 

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        username: '',
        email: '',
        password: '',
        passwordCheck: ''
    };
  }

  usernameHandler = (event) => {
    this.setState({username: event.target.value});
  }

  emailHandler = (event) => {
    this.setState({email: event.target.value});
  }

  passwordHandler = (event) => {
    this.setState({password: event.target.value});
  }

  passwordCheckHandler = (event) => {
    this.setState({passwordCheck: event.target.value});
  }

  submitHandler = (event) => {
    if (this.state.username !== "" && this.state.password === this.state.passwordCheck  && this.state.email.includes("@")) {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/signup`, {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push(res.data)
        })
    }
  }

  render() {
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
                    placeholder='Username'
                    type='text'
                    onChange={this.usernameHandler}
                    />
                  </Col>
                  <Col xs={6}>
                    <input
                    placeholder='Email'
                    type='text'
                    onChange={this.emailHandler}
                    />
                  </Col>
              </Row>
              <Row> 
                  <Col xs={6}>
                    <input
                    placeholder='Password'
                    type='password'
                    onChange={this.passwordHandler}
                    />
                  </Col>
                  <Col xs={6}>
                    <input
                    placeholder='Confirm password'
                    type='password'
                    onChange={this.passwordCheckHandler}
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
              </Col>
            </Row>
          </Col>
        </Row>
        </React.Fragment>
    );
  }
}

export default SignUpForm ;