import emitter from '../emitter';

emitter.on('command:stop', () => {
  emitter.emit('player:stop');
});

const command = {
  command: 'stop',
  description: 'Clears the Queue',
  usage: '`stop`'
};

export default command;
