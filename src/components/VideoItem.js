import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { observer, inject } from 'mobx-react';

//Draws every miniature picture of each item as weel as the title and description of the video
@observer
class VideoItem extends Component {
    onVideoSelect = (video) => {
        this.props.rootStore.chosenVideo(video);
    }

    render() {
        const video = this.props.video;
        return (
            <Col xs="12" sm="12" md="6" lg="4" key={`${video.snippet.title}-${video.id.videoId}`}>
                <Card  className="item cardMargin" onClick={() => this.onVideoSelect(video)}>
                    <CardImg top className="responsiveImg" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                    <CardBody className="cardBodyHeight">
                        <Link to={`/videoDetail/${video.id.videoId}`}>
                            <CardTitle className="limitTitle carTitle">{video.snippet.title}</CardTitle>
                        </Link>
                        <CardText size="sm" className="limitDescription carDescription">{video.snippet.description == '' ? 'No Description' : video.snippet.description}</CardText>
                    </CardBody>
                </Card>
            </Col>
        )
    }
};

export default VideoItem = inject('rootStore')(VideoItem);