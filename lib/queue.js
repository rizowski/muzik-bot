import Logger from './logger';
import { cyan } from 'chalk';
import _ from 'lodash';

const logger = Logger(cyan('queue'));

const emptyQueueResponses = [
  '¯\\_(ツ)_/¯',
  "... Have you seen my status? I'm not playing anything.",
  "The queue: ```\n     \\_______/\n`.,-'\\_____/`-.,'\n  /`..'\\ _ /`.,'\\\n /  /`.,' `.,'\\  \\\n/__/__/     \\__\\__\\__\n\\  \\  \\     /  /  /\n \\  \\,'`._,'`./  /\n  \\,'`./___\\,'`./\n ,'`-./_____\\,-'`.\n     /       \\\n```",
  'Nothing...',
];

let Q = [];
const ends = '```';

const cue = {
  enqueue(id, info, discord) {
    const queueItem = {
      id: _.cloneDeep(id),
      info: _.cloneDeep(info),
      discord: _.cloneDeep(discord),
    };
    logger.log(`Queueing ${cyan(info.title)}`);
    Q.push(queueItem);
    return queueItem;
  },
  dequeue() {
    const next = Q.shift();
    if (!next) {
      return null;
    }
    logger.debug(`Up Next: ${next.info.title}`);

    return next;
  },
  clear() {
    Q = [];
  },
  shuffle() {
    Q = _.shuffle(Q);
  },
  print() {
    const musicItems = _(Q)
      .take(10)
      .map((q, i) => `${i + 1} ${q.info.title}`)
      .value();
    const randomIdx = Math.floor(Math.random() * emptyQueueResponses.length);

    const response = musicItems.length
      ? `${ends}${musicItems.join('\n')}${ends}`
      : emptyQueueResponses[randomIdx];

    return response;
  },
  size() {
    return Q.length;
  }
};

export default cue;
