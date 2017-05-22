import yt from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import Logger from '../logger';
import youtube from 'youtube-api';
import config from 'config';
import _ from 'lodash';
import { red } from 'chalk';

const logger = Logger(red('YouTube'));

youtube.authenticate({
  type: 'key',
  key: config.get('apiKeys.youtube')
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
    logger.log('Downloading...', url);
    const audioPath = `${cache}/${options.filename.replace(/[ ]{1,}/g, '-') || Date.now()}.webm`;
    let video;
try {
  video = yt(url, { filter: 'audioonly' });
} catch (e) {
  console.log('download', e)
}
    video.pipe(fs.createWriteStream(audioPath));
    return video;
  },
  stream(url){
    logger.log('Loading...', url);
    return yt(url, { filter: 'audioonly' });
  },
  info(url){
    return yt.getInfo(url);
  },
  playlist(playlistId){
    logger.log('Loading...', playlistId);
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
      return _.map(songs, (song) => song.snippet.resourceId.videoId);
    });
  },
  search(terms){
    logger.log('Searching...', terms);

    return new Promise((resolve, reject) =>{
      youtube.search.list({
        part: 'snippet',
        q: terms
      }, (err, result) => {
        if(err) return reject(err);
        resolve(result);
      });
    }).then((results) => {
      const song = _.find(results.items, (song) => song.id.kind === 'youtube#video');
      if(!song){
        throw new Error('No song found');
      }
      return song.id.videoId;
    });
  }
};
