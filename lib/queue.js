import emitter from './emitter';
import Logger from './logger';
import { cyan } from 'chalk';
import _ from 'lodash';

const logger = Logger(cyan('queue'));

const Q = [];

const queue = {
  add(id, info, discord){
    const queueItem = { id, info, discord };
    logger.log(`Queueing ${cyan(info.title)}`);
    Q.push(queueItem);
    emitter.emit('queue:add', queueItem);
  },
  next(){
    const next = Q.shift();
    if(!next){
      return null;
    }
    logger.debug(`Up Next: ${next.info.title}`);
    emitter.emit('queue:next', next);

    return next;
  }
};

emitter.on('queue:clear', () =>{
  Q.length = 0;
});

emitter.on('queue:song', ({ info, id, discord }) => {
  queue.add(id, info, discord);
});

emitter.on('queue:print-queued', ({ discord }) =>{
  let number = 1;
  const response = _.reduce(Q, (acc, song) => {
    acc += `${number}) \`${song.info.title}\`\n`;
    number++;
    return acc;
  }, '');
  console.log(response);
  emitter.emit('bot:response', { response, discord });
});

export default queue;
