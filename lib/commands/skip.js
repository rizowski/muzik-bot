import emitter from '../emitter';

const command = {
  command: 'skip',
  cares(str){
    const regex = new RegExp(`^${command.command}`, 'i');
    return regex.test(str);
  },
  generateResponse(){
    emitter.emit('player:skip');
  }
};

export default command;
