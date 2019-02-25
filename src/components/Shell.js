import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SearchBar from './SearchBar'
import { videoDataList } from '../apis/youTube';
import VideoList from './VideoList';
import { toJS } from 'mobx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//This manages the request of Videos retrieve by the YouTube API
@observer
class ShellBase extends Component {
    state = {
        videos: [],
        selectedVideo: null,
        loading: false
    }

    onSearch = async (term) => {
        let $this = this;
        this.setState({ loading: true });

        new Promise((resolve, reject) => {
            videoDataList(term)
                .then(function (response) {
                    if (response) {
                        $this.setState({ loading: false });
                        resolve($this.props.rootStore.fillVideos(response.data.items))
                        const videos = toJS($this.props.rootStore.videos);
                        localStorage.setItem('rootStore', JSON.stringify(videos));
                    }
                })
        });
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    onStopSearch = (load) => {
        this.setState({ loading: !load });
    }

    render() {

        const videos = localStorage.getItem('rootStore');
        if (videos) {
            this.props.rootStore.fillVideos(JSON.parse(videos));
        }
        return (
            <div>
                <ToastContainer />
                <SearchBar loading={this.state.loading} onSearch={this.onSearch} onStopSearch={this.onStopSearch} />
                <VideoList loading={this.state.loading} onVideoSelect={this.onVideoSelect} />
            </div>
        );
    }
}

export default ShellBase = inject('rootStore')(ShellBase);
