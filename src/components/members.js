import React from 'react';
import axios from 'axios';
import WeatherPreview from './weather.js';
import NewsPreview from './news.js';
import SportPreview from './sport.js';
import TasksPreview from './tasks-preview.js';
import Clothes from './clothes.js';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './styles/members.module.css'; 
import { Link } from 'react-router-dom';

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        user: 'Member'
    };
  }

  componentDidMount() {
    if (!this.state.userId) {
      this.getUserId();
    }
  }

  getUserId() {
    axios.get(`https://therapy-node.herokuapp.com/api/user_data`)
    .then((response) => {
      this.setState({user: response.data.username})
    })
  }

  render() {
    return (
        <React.Fragment>
        <Row className={styles.wrapper}>
        <h1>Hello {this.state.user}!</h1>
          <Col xs={12}>
            <Row center="xs" className={styles.row}>
                <Col xs={4} >
                    <Row center="xs" className={styles.boxtitle}>
                        <h3>Weather</h3>  
                    </Row>
                    <Row center="xs" className={styles.boxwrapper}>
                        <Col xs={12} >
                        <WeatherPreview />
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} >
                    <Row center="xs" className={styles.boxtitle}>
                    <Link to="/news"><h3>News</h3> </Link> 
                    </Row>
                    <Row center="xs" className={styles.boxwrapper}>
                        <Col xs={12} >
                        <NewsPreview />
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} >
                  <Row center="xs" className={styles.boxtitle}>
                      <Link to="/winners"><h3>Sport</h3> </Link> 
                    </Row>
                    <Row center="xs" className={styles.boxwrapper}>
                        <Col xs={12} >
                          <SportPreview />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row center="xs" className={styles.row}>
                <Col xs={4} >
                  <Row center="xs" className={styles.boxtitle}>
                    <Link to="/image"><h3>Images</h3></Link>
                  </Row>
                  <Row center="xs" className={styles.boxwrapper}>
                      <Col xs={12} >
                      </Col>
                  </Row>
                </Col>
                <Col xs={4}>
                  <Row center="xs" className={styles.boxtitle}>
                  <Link to="/tasks"><h3>Tasks</h3></Link>
                      </Row>
                  <Row center="xs" className={styles.boxwrapper}>
                      <Col xs={12} >
                        <TasksPreview />
                      </Col>
                  </Row>
                </Col>
                <Col xs={4}>
                  <Row center="xs" className={styles.boxtitle}>
                      <h3>Clothes</h3>  
                  </Row>
                  <Row center="xs" className={styles.boxwrapper}>
                      <Col xs={12} >
                        <Clothes />
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

export default Members;