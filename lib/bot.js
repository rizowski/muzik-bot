import _ from 'lodash';

import emitter from './emitter';
import Logger from './logger';
import { bot } from './events';
import guardian from './gate-keeper';

const logger = Logger('processor');

emitter.on(bot.acknowledgeMessage, (discord) =>{
  const { message, guild } = discord;
  const { content } = message;
  const parsed = _.without(content.split(' ').slice(1), '');
  const command = parsed[0];
  const commandless = parsed.slice(1);

  if(guardian.allowsPassage(guild.roles, message.author, command)){
    logger.debug(`Emitting 'command:${command}'`);
    emitter.emit(`command:${command}`, {
      input: {
        args: commandless,
        string: commandless.join('')
      },
      discord
    });
  }
});

emitter.on(bot.response, ({ response, discord }) => {
  const { channel, message } = discord;
  logger.log(`Responding: ${response}`);
  channel.startTyping();
  message.channel.sendMessage(response);
  channel.stopTyping();
});
