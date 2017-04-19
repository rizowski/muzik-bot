import emitter from '../emitter';
import commands from './index';
import _ from 'lodash';

emitter.on('command:help', ({ input, discord }) =>{
  const { string } = input;
  const { client } = discord;
  const username = client.user.username;
  const allCommands = _.map(commands, c => `${c.command} - ${c.description}`).join('\n');

  const ends = '```';

  let response = `I have the following commands:
${ends}
${allCommands}
${ends}
Just \`@${username}\` with your command and I will oblige.
You can also \`@${username} help <command>\` to get more information about a particular command`;

  if(string){
    const regex = new RegExp(`^${string}`);
    response = _.reduce(commands, (str, c) => {
      if(regex.test(c.command)){
        str = `${ends}${c.usage}${ends}`;
      }
      return str;
    }, '');
  }

  emitter.emit('bot:response', { response, discord });
});

const command = {
  command: 'help',
  description: 'Gives you some less than helpful information',
  usage: 'help [command]',
};

export default command;
