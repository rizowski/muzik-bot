import { Observable } from 'rxjs/Observable';
import cmds from '../index';
import Logger from '../../logger';
import config from 'config';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import includes from 'lodash/includes';

import 'rxjs/add/observable/of';

const logger = Logger('command:help');
const ends = '```';

function getSubCommandHelpText(subCommandName) {
  const subCommand = find(
    cmds,
    cmd =>
      cmd.command.startsWith(subCommandName) &&
      !includes(config.get('restricted.commands'), subCommandName)
  );

  return (
    subCommand &&
    `\`${subCommand.command}\` - ${subCommand.description}\n${ends}${subCommand.usage}${ends}`
  );
}

function getDefaultResponse(username) {
  const cmdList = map(cmds, c => `${c.command} - ${c.description}`).join('\n');

  return `I have the following commands:
${ends}${cmdList}${ends}
Just \`@${username}\` with your command and I will oblige.
You can also \`@${username} help <command>\` to get more information about a particular command`;
}

function action({ input, payload }) {
  logger.debug('handling', input.string);
  const { string } = input;
  const username = get(payload, 'original.client.user.username');

  // fall-through ternary
  // if either `string` or `getSubCommandHelpText` returns falsey, then fall through to default response
  const response =
    (string && getSubCommandHelpText(string)) || getDefaultResponse(username);

  return Observable.of({ response, payload });
}

const command = {
  command: 'help',
  description: 'Gives you some less than helpful information',
  usage: 'help [command]',
  action,
};

export default command;
