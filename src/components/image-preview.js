import React from 'react';
import axios from 'axios';
import styles from './styles/image-preview.module.css'; 

class ImagePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId: null,
            getImages: false,
            image: [],
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
    
      getImages() {
        let imgFile = []
        axios.get(`http://localhost:8080/api/images/` + this.state.userId)
        .then((response) => {
            if (response.data.length > 0) {
                imgFile.push(require('../../../dev-challenge-node/assets/uploads/' + response.data[0].filename))
                this.setState({getImages: true})
                this.setState({images: imgFile})
            }
          })
      }
  render() {
    if (!this.state.getImages && this.state.userId) {
        this.getImages();
      }
      let image
      if (this.state.images && this.state.images.length > 0) {
        image = <img src={this.state.images[0]} className={styles.photo} alt="image" />
      }
    return (
        <React.Fragment>
            {image}
        </React.Fragment>
    );
  }
}

export default ImagePreview;