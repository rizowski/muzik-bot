import emitter from '../emitter';

const responses = ['Hi', 'Hello', ':wave:', 'Hi there.', 'Whachuwant?', 'Howdy', 'Greetings', 'Yo dawg', ':kappa:'];
const triggers = ['hello', 'hi', 'yo'];

const command = {
  command: 'hello',
  cares(str){
    const regex = new RegExp(`^(${triggers.join('|')})`, 'i');
    return regex.test(str);
  },
  generateResponse(str, message, client){
    const random = Math.floor(Math.random() * responses.length);
    const response = responses[random];
    emitter.emit('bot:response', { response, message, client });
  }
};

export default command;
