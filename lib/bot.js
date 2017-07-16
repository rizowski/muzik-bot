import _ from 'lodash';

import emitter from './emitter';
import Logger from './logger';
import { bot } from './events';
import gateKeeper from './gate-keeper';

const logger = Logger('processor');

emitter.on(bot.acknowledgeMessage, (payload) => {
  const { message, server } = payload;
  const { content } = message;
  const parsed = _.without(content.split(' ').slice(1), '');
  const command = parsed[0];
  const commandless = parsed.slice(1);

  if(gateKeeper.allowsPassage(message, server, command)){
    logger.debug(`Emitting 'command:${command}'`);
    emitter.emit(`command:${command}`, {
      input: {
        args: commandless,
        string: commandless.join('')
      },
      payload
    });
  }
});

emitter.on(bot.response, ({ response, payload }) => {
  const { message } = payload;
  logger.log(`Responding: ${response}`);
  message.channel.startTyping();
  message.channel.send(response);
  message.channel.stopTyping();
});
