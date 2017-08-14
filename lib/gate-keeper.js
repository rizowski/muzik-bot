import _ from 'lodash';
import { permissions, restricted } from 'config';

import createLogger from './logger';

const logger = createLogger('gate-keeper');

logger.debug(`Role permissions enabled: ${permissions.enabled}.`);

const botRoles = ['muzik-mods', 'muzik-djs'];

const commandsAvailable = [
  'cache.settings',
  'cache.clean',
  'bot.help',
  'bot.hello',
  'player.settings',
  'player.play',
  'player.queued',
  'player.skip',
  'player.stop',
  'player.shuffle',
  'player.volume'
];

const activeCommands = _(permissions.owner).union(permissions.mod, permissions.dj).uniq().without(...restricted.commands).value();
const disabledCommands = _.without(commandsAvailable, ...activeCommands);

const ownerPermissions= _.without(_.union(permissions.owner, permissions.mod, permissions.dj),...disabledCommands);
const modPermissions = _.without(_.union(permissions.mod, permissions.dj), ...disabledCommands);
const djPermissions = _.without(permissions.dj, ...disabledCommands);

logger.debug('Active Commands: %o', activeCommands);
logger.debug('Disabled Commands: %o', disabledCommands);
logger.debug('Owner Permissions: %o', ownerPermissions);
logger.debug('Mod Permissions: %o', modPermissions);
logger.debug('Dj Permissions: %o', djPermissions);

function hasPermission(permissions, command){
  return _.some(permissions, p => p.includes(command));
}
const perms = {};

perms.sendMessage = 1;
perms.readMessage = perms.send_message << 1;

function hasRole(roles, role){
  return _.some(roles, r => r.name === role);
}

const guardian = {
  allowsPassage(message, server, command) {
    if(!permissions.enabled){
      logger.debug('Permissions disabled');
      return true;
    }
    if (message.serverOwner) {
      logger.debug('Server owner detected... allowing commands');
      return true;
    }

    return guardian.allowsChannel(message.channel.id) && guardian.allowsCommand(message, server, command);
  },
  allowsCommand(message, server, command){
    const { roles } = server;
    const { author } = message;
    const userRoles = roles.filterArray(role => _.includes(botRoles, role.name) && role.members.has(author.id));

    if (!userRoles.length) {
      logger.debug('No roles found');
      return false;
    }

    if (hasRole(userRoles, 'muzik-mods')){
      logger.debug('Checking Mod permissions for', command);
      return hasPermission(modPermissions, command);
    }
    if (hasRole(userRoles, 'muzik-djs')){
      logger.debug('Checking DJ permissions for', command);
      return hasPermission(djPermissions, command);
    }

    logger.debug('No permission found');
    return false;
  },
  allowsChannel(channelId){
    return !_.includes(restricted.channels, channelId);
  }
};

export default guardian;
