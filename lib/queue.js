import emitter from './emitter';
import Logger from './logger';
import { cyan } from 'chalk';
import _ from 'lodash';
import { queue, bot } from './events';

const logger = Logger(cyan('queue'));

const emptyQueueResponses = [
  '¯\\_(ツ)_/¯',
  '... Have you seen my status? I\'m not playing anything.',
  "The queue: ```\n     \\_______/\n`.,-'\\_____/`-.,'\n  /`..'\\ _ /`.,'\\\n /  /`.,' `.,'\\  \\\n/__/__/     \\__\\__\\__\n\\  \\  \\     /  /  /\n \\  \\,'`._,'`./  /\n  \\,'`./___\\,'`./\n ,'`-./_____\\,-'`.\n     /       \\\n```",
  'Nothing...'
];

let Q = [];
const ends = '```';

const cue = {
  add(id, info, discord){
    const queueItem = { id, info, discord };
    logger.log(`Queueing ${cyan(info.title)}`);
    Q.push(queueItem);
    emitter.emit(queue.add, queueItem);
  },
  next(){
    const next = Q.shift();
    if(!next){
      return null;
    }
    logger.debug(`Up Next: ${next.info.title}`);
    emitter.emit(queue.next, next);

    return next;
  }
};

emitter.on(queue.clear, () =>{
  Q.length = 0;
});

emitter.on(queue.song, ({ info, id, discord }) => {
  cue.add(id, info, discord);
});

emitter.on(queue.shuffle, () => {
  logger.log('Shuffling Queue...');
  Q = _.shuffle(Q);
});

emitter.on(queue.print, ({ discord }) => {
  let number = 1;
  const musicItems = _(Q).take(10).map(Q, (q) =>{
    return `${number++}) ${q.info.title}`;
  });
  const random = Math.floor(Math.random() * emptyQueueResponses.length);
  const randomResponse = emptyQueueResponses[random];

  let response = musicItems.length ? `${ends}${musicItems.join('\n')}${ends}` : randomResponse;

  emitter.emit(bot.response, { response: response, discord });
});

export default cue;
