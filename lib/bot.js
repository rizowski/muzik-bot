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
  determineResponse(message, client);
});

emitter.on('bot:response', ({ response, message }) => {
  logger.debug(`Sending: ${response}`);
  message.channel.sendMessage(response);
});
