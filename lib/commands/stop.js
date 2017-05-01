import emitter from '../emitter';
import Logger from '../logger';

const logger = Logger('command:stop');

emitter.on('command:stop', () => {
  logger.debug('triggered');
  emitter.emit('player:stop');
});

const command = {
  command: 'stop',
  description: 'Clears the Queue',
  usage: '`stop`'
};

export default command;
