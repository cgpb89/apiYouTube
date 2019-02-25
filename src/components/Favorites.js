import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import { observer, inject } from 'mobx-react';
//Draws a list of Favorite Videos
@observer
class Favoite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        let videos = localStorage.getItem('favoriteVideos');
        if (typeof videos !== null) {
            videos = JSON.parse(videos);
            this.setState({ videos })
        }
    }

    onVideoSelect = (video) => {
        this.props.rootStore.chosenVideo(video);
    }

    render() {
        const videos = this.state.videos;
        if (!videos) {
            return <Alert color="danger" className="cardMargin">
                No Favorite Videos Added
          </Alert>
        }
        return (
            <Row>
                {videos.map((video, index) => {
                    return (
                        <Col xs="12" sm="12" md="6" lg="4" key={`favorite-${video.snippet.title}-${video.id.videoId}`}>
                            <Card className="item cardMargin" onClick={() => this.onVideoSelect(video)}>
                                <CardImg top className="responsiveImg" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                                <CardBody className="cardBodyHeight">
                                    <Link to={`/videoDetail/${video.id.videoId}`}>
                                        <CardTitle className="limitTitle carTitle">{video.snippet.title}</CardTitle>
                                    </Link>
                                    <CardText size="sm" className="limitDescription carDescription">{video.snippet.description == '' ? 'No Description' : video.snippet.description}</CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        )
    }
};

export default Favoite = inject('rootStore')(Favoite);