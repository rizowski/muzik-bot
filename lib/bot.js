import _ from 'lodash';

import emitter from './emitter';
import Logger from './logger';
import commands from './commands';

const logger = Logger('processor');

function determineResponse(message, client){
  const content = message.content;
  const parsed = _.without(content.split(' ').slice(1), '').join(' ');
  _.each(commands, (command) => {
    if(command.cares(parsed)){
      logger.debug(command.command, 'cares!');
      command.generateResponse(parsed, message, client);
    }
  });
}

emitter.on('bot:aknowledge-message', ({ client, message }) =>{
  const channel = message.channel;
  channel.startTyping();
  determineResponse(message, client);
  channel.stopTyping();
});

emitter.on('bot:response', ({ response, message }) => {
  const channel = message.channel;
  logger.debug(`Sending: ${response}`);
  channel.startTyping();
  message.channel.sendMessage(response);
  channel.stopTyping();
});
