import emitter from '../emitter';

const command = {
  command: 'search',
  cares(str){
    const regex = new RegExp(`^${command.command}`, 'i');
    return regex.test(str);
  },
  generateResponse(str, message, client){
    emitter.emit('bot:response', {
      response: 'I don\'t know how to do a `search`',
      message,
      client
    });
  }
};

export default command;
