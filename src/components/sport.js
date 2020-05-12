import React from 'react';
import axios from 'axios';

class SportPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        headline: "No news today",
        desc: null,    };
  }

  componentDidMount() {
    this.getSport();
  }

  getSport() {
    axios.get(`https://feeds.bbci.co.uk/sport/rss.xml?edition=uk`)
    .then((response) => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response.data, "text/xml")
        var topStory = xmlDoc.getElementsByTagName("item")[0]
        if (topStory.getElementsByTagName("title")[0].childNodes[0].nodeValue) {
            this.setState({headline: topStory.getElementsByTagName("title")[0].childNodes[0].nodeValue}) 
        }
        if (topStory.getElementsByTagName("description")[0].childNodes[0].nodeValue) {
            this.setState({desc: topStory.getElementsByTagName("description")[0].childNodes[0].nodeValue}) 
        }
    })
  }

  render() {
    return (
      <React.Fragment>
        <h3>{this.state.headline}</h3>
        <p>{this.state.desc}</p>
      </React.Fragment>
    );
  }
}

export default SportPreview;