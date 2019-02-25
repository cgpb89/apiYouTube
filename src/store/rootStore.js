import { observable, action } from "mobx";

export class RootStore {
    @observable videos = []
    @observable video = null

    @action
    fillVideos(array) {
        this.videos = array;
    }

    @action
    chosenVideo(video) {
        this.video = video;
    }
}
