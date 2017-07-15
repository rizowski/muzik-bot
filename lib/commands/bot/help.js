import emitter from '../../emitter';
import cmds from '../index';
import Logger from '../../logger';
import { bot, commands } from '../../events';
import config from 'config';
import _ from 'lodash';

const logger = Logger('command:help');

emitter.on(commands.help, ({ input, discord }) =>{
  logger.debug('handling', input.string);
  const { string } = input;
  const { client } = discord;
  const username = client.user.username;
  const allCommands = _.map(cmds, c => `${c.command} - ${c.description}`).join('\n');

  const ends = '```';

  let response = `I have the following commands:
${ends}${allCommands}${ends}
Just \`@${username}\` with your command and I will oblige.
You can also \`@${username} help <command>\` to get more information about a particular command`;

  if(string){
    const regex = new RegExp(`^${string}`);
    response = _.reduce(cmds, (str, c) => {
      if(regex.test(c.command) && !_.includes(config.get('commands.disabled'), string)){
        str = `\`${c.command}\` - ${c.description}\n${ends}${c.usage}${ends}`;
      }
      return str;
    }, '');
  }

  emitter.emit(bot.response, { response, discord });
});

const command = {
  command: 'help',
  description: 'Gives you some less than helpful information',
  usage: 'help [command]',
};

export default command;
