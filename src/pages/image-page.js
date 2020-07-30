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
        axios.get(`http://localhost:8080/api/user_data`)
        .then((response) => {
          this.setState({userId: response.data.id})
        })
      }

      getImages() {
        let imgFiles = []
        axios.get(`http://localhost:8080/api/images/` + this.state.userId)
        .then((response) => {
          response.data.map((img) =>
          imgFiles.push(require('../../../dev-challenge-node/assets/uploads/' + img.filename))
          )
            this.setState({getImages: true})
            this.setState({images: imgFiles})
          })
      }

      render() {
        if (this.state.userId && !this.state.getImages) {
            this.getImages()
        }
        let imgGallery
        if (this.state.images !== {}) {
          imgGallery = this.state.images.map((img) => 
              <Col xs={4} className={styles.gallery}>
              <img src={img} className={styles.photo} alt="image" />
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