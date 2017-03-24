import emitter from './emitter';
import Logger from './logger';
import { cyan } from 'chalk';

const logger = Logger('queue');

const Q = [];

const queue = {
  add(id, info, discord){
    const queueItem = { id, info, discord };
    logger.log(`Adding ${cyan(info.title)} to the queue`);
    Q.push(queueItem);
    emitter.emit('queue:add', queueItem);
  },
  next(){
    const next = Q.shift();
    logger.debug(`Pulling ${next.info.title} from queue`);
    emitter.emit('queue:next', next);
    return next;
  }
};

emitter.on('queue:song', ({ info, id, channel, message, client }) => {
  queue.add(id, info, { channel, message, client });
});

export default queue;
