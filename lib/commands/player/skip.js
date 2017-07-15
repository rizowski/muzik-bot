import emitter from '../../emitter';

emitter.on('command:skip', () =>{
  emitter.emit('player:skip');
});

const command = {
  command: 'skip',
  description: 'Skips something nasty',
  usage: '`skip`'
};

export default command;
