import emitter from '../../emitter';

emitter.on('command:shuffle', () =>{
  emitter.emit('queue:shuffle');
});

const command = {
  command: 'shuffle',
  description: 'Shuffles all the songs in the current queue',
  usage: '`shuffle`'
};

export default command;
