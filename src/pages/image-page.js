import React from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import styles from './styles/image-page.module.css'; 
import { Grid, Row, Col } from 'react-flexbox-grid';
import ImageUp from './../components/image-upload.js';

class ImageUpload extends React.Component {

    constructor() {
        super();
        this.state = {
          userId: null,
          getImages: false,
          images: []
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
          this.setState({userId: response.data.id})
        })
      }

      getImages() {
        axios.get(`https://therapy-node.herokuapp.com/api/images/` + this.state.userId)
        .then((response) => {
            this.setState({getImages: true})
            this.setState({images: response.data})
          })
      }

      render() {
        if (this.state.userId && !this.state.getImages) {
            this.getImages()
        }
        let imgGallery
        if (this.state.images !== {}) {
                    console.log("iMg",this.state.images)
          imgGallery = this.state.images.map((img, index) => 
              <Col xs={4} className={styles.gallery}>
              <img src={require('./../uploads/' + img.filename)} className={styles.photo} alt="image" />
              </Col>
            );
        }

        return (
            <Row className={styles.wrapper}>
                <Col xs={12} >
            <Row className={styles.title}>
                <Col xs={12} >
                    <h1>Photos</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={6} className={styles.uploader}>
                    <ImageUp userId={this.state.userId}/>
                </Col>
            </Row>
            <Row >
                {imgGallery}
            </Row>
            </Col>
            </Row>
        );
      }
    }

export default ImageUpload;