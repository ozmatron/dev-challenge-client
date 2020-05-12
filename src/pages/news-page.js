import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './styles/news-page.module.css'; 

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        headline: "No news today",
        desc: null, 
        img: null   
    };
  }

  componentDidMount() {
    this.getNews();
  }

  getNews() {
    axios.get(`http://feeds.bbci.co.uk/news/rss.xml`)
    .then((response) => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response.data, "text/xml")
        var topStory = xmlDoc.getElementsByTagName("item")[0]
        // console.log(response.data)
        if (xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue) {
          this.setState({img: xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue}) 
        }
        if (topStory.getElementsByTagName("title")[0].childNodes[0].nodeValue) {
            this.setState({headline: topStory.getElementsByTagName("title")[0].childNodes[0].nodeValue}) 
        }
        if (topStory.getElementsByTagName("description")[0].childNodes[0].nodeValue) {
            this.setState({desc: topStory.getElementsByTagName("description")[0].childNodes[0].nodeValue}) 
        }
    })
  }

  render() {
    let img = <img src={this.state.img} alt="Logo" />;
    // console.log("duff", this.state);
    return (
      <React.Fragment>
                  <Row className={styles.wrapper}>
          <Col xs={12} >
          <Row>
            <Col xs={12} >
            <h3>{this.state.headline}</h3>
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
            {img}
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
            <p>{this.state.desc}</p>
            </Col>
        </Row>
        </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default News;