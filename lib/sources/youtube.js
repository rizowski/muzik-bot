import yt from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import Logger from '../logger';
import youtube from 'youtube-api';
import config from 'config';
import _ from 'lodash';

const logger = Logger('youtube');

youtube.authenticate({
  type: 'key',
  key: config.get('youtube.apiKey')
});

const cache = path.resolve(path.join(__dirname, '../../.cache'));

try {
  fs.statSync(cache);
  logger.debug(cache, 'already exists');
} catch (e) {
  if(e.code === 'ENOENT'){
    logger.debug('Creating Cache directory at', cache);
    fs.mkdir(cache);
  }
}

export default {
  download(url, options={}){
    const audioPath = `${cache}/${options.filename.replace(/[ ]{1,}/g, '-') || Date.now()}.webm`;

    const video = yt(url, { filter: 'audioonly' });
    video.pipe(fs.createWriteStream(audioPath));
    return video;
  },
  stream(url){
    return yt(url, { filter: 'audioonly' });
  },
  info(url){
    return yt.getInfo(url);
  },
  playlist(playlistId){
    return new Promise((resolve, reject) =>{
      youtube.playlistItems.list({
        part: 'snippet',
        pageToken: null,
        maxResults: 50,
        playlistId
      }, (err, results) => {
        if (err){
          return reject(err);
        }
        return resolve(results.items);
      });
    })
    .then((songs) =>{
      return _.map(songs, (song) =>{
        return song.snippet.resourceId.videoId;
      });
    });
  },
  search(terms){
    logger.log('searching for', terms);

    return new Promise((resolve, reject) =>{
      youtube.search.list({
        part: 'snippet',
        q: terms
      }, (err, result) =>{
        if(err) return reject(err);
        resolve(result);
      });
    }).then((results) =>{
      return results.items[0].id.videoId;
    });
  }
};
