import emitter from './emitter';
import yt from './sources/youtube';
import Promise from 'bluebird';
import _ from 'lodash';
import Logger from './logger';
import { processor, queue, bot } from './events';

const logger = Logger('processor');

function handleError(err){
  logger.error(err);
}

emitter.on(processor.playlist, ({ id, discord }) => {
  logger.debug('playlist', id);
  yt.playlist(id)
    .then((ids) => {
      return Promise.map(ids, (id) => {
        return yt.info(id)
          .then((info) => ({ info, id }));
      });
    })
    .then((datas) => {
      _.each(datas, (data) => {
        emitter.emit(queue.song, { info: data.info, id: data.id, discord });
      });
    }).catch(handleError);
});

emitter.on(processor.video, ({ id, discord }) => {
  logger.debug('video', id);
  yt.info(id)
    .then((info) => {
      emitter.emit(queue.song, { info, id, discord });
    }).catch(handleError);
});

emitter.on(processor.term, ({ terms, discord }) =>{
  logger.debug('serach', terms);
  yt.search(terms)
    .then((id) =>{
      return yt.info(id)
        .then((info) => {
          emitter.emit(queue.song, { id, info, discord });
        });
    }).catch((err) =>{
      if(/No song found/.test(err.message)){
        emitter.emit(bot.response, { response: `Uh-Oh! Something went wrong with trying to find ${terms} Try again or try a url instead.`, discord });
      }
      handleError(err);
    });
});
