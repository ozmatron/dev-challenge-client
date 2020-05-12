import React from 'react';
import axios from 'axios';
import styles from './styles/image-upload.module.css'; 
import { Grid, Row, Col } from 'react-flexbox-grid';

class ImageUp extends React.Component {
    constructor() {
        super();
        this.state = {
          userId: '',
          selectedFile: '',
        };
      }

      componentDidMount() {
        if (this.props.userId) {
            let str = this.props.userId.toString()
            this.setState({ userId: this.props.userId });
            console.log("Done")
        }
      }

      onChange = (e) => {
        switch (e.target.name) {
          case 'selectedFile':
            this.setState({ selectedFile: e.target.files[0] });
            break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
      }

      onSubmit = (e) => {
        e.preventDefault();
        const selectedFile = this.state.selectedFile;
        let userIdStr = this.props.userId.toString()
        let formData = new FormData();

        formData.append('userId', userIdStr);
        formData.append('selectedFile', selectedFile);

        axios.post('http://localhost:8080/api/upload', formData)
          .then((result) => {
          });
      }

      render() {
        const { userId, selectedFile } = this.state;

        return (
        <Row>
            <Col xs={12}>
                <Row>
                <form onSubmit={this.onSubmit}>
                    <Col xs={12}>
                    <input
                        type="file"
                        name="selectedFile"
                        id="file-upload"
                        onChange={this.onChange}
                    />
                    </Col>
                    <Col xs={12}>
                    <label for="file-upload" className={styles.getFile}>
                        Select photo
                    </label>
                    <input
                    type='submit'
                    value="Add photo"
                    />
                    </Col>
                </form>
                </Row>
            </Col>
          </Row>
        );
      }
    }
export default ImageUp;