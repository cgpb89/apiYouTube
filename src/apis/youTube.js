import axios from 'axios';
//Methos to retrieve YouTube API data
const KEY = 'AIzaSyCbiNUgSxaqsaXpKqHtBOvv6XAnA9SwKpQ';

export function comments(vieoId) {
  return axios.get('https://www.googleapis.com/youtube/v3/commentThreads/', {
    params: {
      key: KEY,
      part: 'snippet',
      textFormat: 'plainText',
      videoId: vieoId,
    }
  })
    .catch(function (error) {
      console.log(error);
    });
}

export function extraVideoData(videoId) {
  return axios.get('https://www.googleapis.com/youtube/v3/videos/', {
    params: {
      key: KEY,
      part: 'statistics',
      id: videoId
    }
  })
    .catch(function (error) {
      console.log(error);
    });
}

export function videoDataList(term) {
  return axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      maxResults: 50,
      key: KEY,
      q: term
    }
  })
    .catch(function (error) {
      console.log(error);
    });
}