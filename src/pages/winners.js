import React from 'react';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './styles/winners.module.css'; 

class Winners extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        winnersData: [],
        dropdownOptions: [],
        selectedTeam: '',
        teamsBeaten: null
    };
  }

  componentDidMount() {
    this.getWinners();
  }

  getWinners() {
    // Derived from python script on csv, see python folder
    axios.get(`https://raw.githubusercontent.com/ozmatron/work/master/footy-winners.json`)
    .then((response) => {
      this.setState({winnersData: response.data}) 
      this.setState({dropdownOptions: Object.keys(response.data)}) 
    })
  }

  onSelect = (event) =>  {
      let team = event.value
      this.setState({selectedTeam: team}) 
      Object.keys(this.state.winnersData).map(key => 
        key === team ?
        this.setState({teamsBeaten: this.state.winnersData[key]}) 
        : null
    )
  }

  render() {
    let dropdown
    if (this.state.dropdownOptions.length > 0) {
        dropdown = <Dropdown options={this.state.dropdownOptions} onChange={this.onSelect} value="Select a team" placeholder="Select a team" />
    }
    let teams
    if (this.state.teamsBeaten) {
      teams = this.state.teamsBeaten.map((team) => 
    <p>{team}</p>
    );
    }
    let selectedTeam
    if (this.state.selectedTeam) {
        selectedTeam = <h3>{this.state.selectedTeam} have beaten:</h3>
    }
    return (
        <React.Fragment>
          <Row className={styles.wrapper}>
          <Col xs={12} >
          <Row>
            <Col xs={12} >
              <h1>Champions League Challenge</h1>
            </Col>
        </Row>
        <Row>
            <Col xs={4} >
              {dropdown}
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
              {selectedTeam}
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
              {teams}
            </Col>
        </Row>
        </Col>
        </Row>
        </React.Fragment>
    );
  }
}

export default Winners;