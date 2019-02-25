import React from 'react';
import _ from 'lodash';
import { css } from '@emotion/core';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Media, CardHeader, CardFooter, Row, Card, CardBody, Button, CardText, Col } from 'reactstrap';
import { comments, extraVideoData } from '../apis/youTube';
import { DotLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Shows the video details data(comments, likes, dislikes)
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

let container;

@inject('rootStore')
@observer
export default class VideoDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vStatistics: {},
            vComments: [],
            loading: true
        }
    }

    componentDidMount() {
        this.videoData();
    }

    extraVideoData = () => {
        if (!this.state.vStatistics.data) {
            return <div></div>
        }
        const vData = this.state.vStatistics.data.items[0].statistics;
        return (
            <Row>
                <ul className="breadcrumbP">
                    <li><i className="far fa-thumbs-up iSpace"></i>{vData.likeCount}</li>
                    <li><i className="far fa-thumbs-down iSpace"></i>{vData.dislikeCount}</li>
                    <li><i className="fas fa-eye iSpace"></i>{vData.viewCount}</li>
                </ul>
            </Row>
        )
    }

    commentsVideo = () => {
        if (!this.state.vComments.data) {//This validation is made due to the restriction made by the owner of a video, no comments allowed/disabled
            const video = toJS(this.props.rootStore.video);
            return <div>No comments or
                The video identified by the
                <code>
                    {`: ${video.snippet.title}`}
                </code> has disabled comments.
            </div>
        }
        const vData = this.state.vComments.data.items;
        return (
            <div>
                {vData.map((item) => {
                    return (
                        <div key={item.snippet.topLevelComment.snippet.publishedAt}>
                            <Media className="cardMargin">
                                <Media left target="_blank" rel="noopener noreferrer" top href={item.snippet.topLevelComment.snippet.authorChannelUrl}>
                                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} />
                                </Media>
                                <Media body>
                                    <Media heading>
                                        {item.snippet.topLevelComment.snippet.authorDisplayName}
                                    </Media>
                                    {item.snippet.topLevelComment.snippet.textDisplay}
                                </Media>
                            </Media>
                        </div>
                    )
                })}
            </div>
        )
    }

    videoData = () => {

        let video = toJS(this.props.rootStore.video)
        if (video) {
            const $this = this;
            //Using a promise to exec a request to the YouTube API
            comments(video.id.videoId)
                .then(function (response) {
                    if (response) {
                        $this.setState({ vComments: response })
                    }
                })
                .catch(function (err) { console.log('Error comments', err) });
            extraVideoData(video.id.videoId)
                .then(function (response) {
                    if (response) {
                        $this.setState({ vStatistics: response })
                    }
                })
                .catch(function (err) { console.log('Error statistics', err) });
        }
    }

    onAddToFavorites = () => {
        try {
            const video = toJS(this.props.rootStore.video);
            let favoriteVideos = localStorage.getItem('favoriteVideos') == null ? [] : JSON.parse(localStorage.getItem('favoriteVideos'));
                if (_.find(favoriteVideos, { videoId: video.id.videoId })) {
                    toast.warn("Video already Added to Favorites", {
                        position: toast.POSITION.TOP_RIGHT
                    });
            } else {
                video.videoId = video.id.videoId;
                favoriteVideos.push(video);
                localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
                toast.success("Video Added to Favorites", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (err) {
            console.log(err);
            toast.error("Oppss!!! Something wrong happened", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }

    spinner = () => (
        <DotLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={'#212529'}
            loading={this.state.loading}
        />
    )

    render() {

        let video = toJS(this.props.rootStore.video)
        let videoSource = {};
        if (!video) {//If the extra data of the video fails, you still can see it, without any style
            videoSource = `https://www.youtube.com/embed/${this.props.match.params.videoId}`;
            video = {};
            video.snippet = {};
            video.snippet.title = '';
            video.snippet.description = '';
        } else {
            videoSource = `https://www.youtube.com/embed/${video.id.videoId}`;
        }

        return (
            < Col xs="12" sm="12" md="12" >
                <ToastContainer />
                <Card className="cardMargin">
                    <CardHeader className="detailHeader">{video.snippet.title == '' ? 'No Title' : video.snippet.title}</CardHeader>
                    <CardBody>
                        <div className="videoWrapper">
                            <iframe title="video player" src={videoSource} />
                        </div>
                        {this.extraVideoData()}
                        <CardText size="sm" className="limitDescription carDescription">{video.snippet.description == '' ? 'No Description' : video.snippet.description}</CardText>
                        <CardText size="sm" className="textAlighnRight"><Button color="link" onClick={this.onAddToFavorites}>Add to Favorites</Button></CardText>
                    </CardBody>
                    <CardFooter className="text-muted">
                        {this.commentsVideo()}
                    </CardFooter>
                </Card>

            </Col >
        );
    }
}