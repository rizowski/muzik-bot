'use strict';

// const ytdl = require('ytdl-core');
const youtube = require('youtube-api');
const config = require('config');
youtube.authenticate({
  type: 'key',
  key: config.get('youtube.apiKey')
});
// ytdl.getInfo('https://www.youtube.com/playlist?list=PLZb6kNIh9TrHokGyJZrvJEhMpO78UMiQM')
new Promise((resolve, reject) =>{
  youtube.playlistItems.list({
    part: 'snippet',
    pageToken: null,
    maxResults: 50,
    playlistId: 'PLZb6kNIh9TrHokGyJZrvJEhMpO78UMiQM'
  }, (err, results) => {
    if (err){
      return reject(err);
    }
    return resolve(results);
  });
})
.then((results) =>{
  console.log(results.items);
});
