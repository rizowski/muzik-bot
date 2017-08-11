import _ from 'lodash';
import playercmds from './player';
import botcmds from './bot';
import cachecmds from './cache';

function classifyCommands(commands, classification){
  return _.map(commands, command => {
    return _.defaultsDeep({}, command, {
      classification,
      permission: `${classification}.${command.command}`
    });
  });
}

export default _.flatten([
  classifyCommands(playercmds, 'player'),
  classifyCommands(botcmds, 'bot'),
  classifyCommands(cachecmds, 'cache'),
]);
