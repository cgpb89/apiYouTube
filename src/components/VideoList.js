import React from 'react';

import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import VideotItem from './VideoItem';
import { Row } from 'reactstrap';
import _ from 'lodash';
import { DotLoader } from 'react-spinners';

//Displays the result list of custom video research

const override = `
    display: block;
    margin: 0 auto;
    border-color: red;`;

@inject('rootStore')
@observer
export default class VideoList extends React.Component {

    spinner = () => (
        <Row className="centerSipinner">
            <DotLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={'#6c849b'}
                loading={this.props.loading}
            />
        </Row>
    )

    videoItems = () => {
        const $this = this;
        return (
            toJS(this.props.rootStore.videos).map((video, index) => {
                return (
                    <VideotItem key={index} onVideoSelect={$this.props.onVideoSelect} video={video} />
                );
            })
        )
    }

    render() {
        return (
            <Row>
                {this.spinner()}
                {this.videoItems()}
            </Row>
        );
    }
}


