import emitter from '../emitter';

emitter.on('command:queued', (data) => {
  emitter.emit('queue:print-queued', data);
});

const command = {
  command: 'queued',
  description: 'Shows what is queued',
  usage: '`queued`'
};

export default command;
