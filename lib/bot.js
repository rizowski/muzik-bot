import _ from 'lodash';

import emitter from './emitter';
import Logger from './logger';
import { bot } from './events';

const logger = Logger('processor');

emitter.on(bot.acknowledgeMessage, (discord) =>{
  const { message } = discord;
  const { content } = message;
  const parsed = _.without(content.split(' ').slice(1), '');
  const commandless = parsed.slice(1);
  logger.debug(`Emitting 'command:${parsed[0]}'`);

  emitter.emit(`command:${parsed[0]}`, {
    input: {
      args: commandless,
      string: commandless.join('')
    },
    discord
  });
});

emitter.on(bot.response, ({ response, discord }) => {
  const { channel, message } = discord;
  logger.log(`Responding: ${response}`);
  channel.startTyping();
  message.channel.sendMessage(response);
  channel.stopTyping();
});
