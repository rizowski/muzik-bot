import emitter from '../emitter';
import _ from 'lodash';

const responses = ['Hi', 'Hello', ':wave:', 'Hi there.', 'Whachuwant?', 'Howdy', 'Greetings', 'Yo dawg', ':kappa:'];
const triggers = ['hello', 'hi', 'yo'];

_.each(triggers, (t) =>{
  emitter.on(`command:${t}`, ({ discord }) =>{
    const random = Math.floor(Math.random() * responses.length);
    const response = responses[random];
    emitter.emit('bot:response', { response, discord });
  });
});

const command = {
  command: 'hello',
  description: 'Says hello',
  usage: '`hello`',
};

export default command;
