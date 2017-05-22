
import _ from 'lodash';
import { permissions, commands } from 'config';

import createLogger from './logger';

const logger = createLogger('gate-keeper');

const botRoles = ['muzik-owner', 'muzik-mods', 'muzik-djs'];

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

const activeCommands = _.without(_.uniq(_.union(permissions.owner, permissions.mod, permissions.dj)), ...commands.disabled);
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
  return _.find(permissions, (p) => p.indexOf(command) >= 0);
}

export default {
  allowsPassage(roles, user, command){
    if(!permissions.enabled){
      return true;
    }

    const result = roles.filter(role => _.includes(botRoles, role.name) && role.members.has(user.id));

    if (!result) {
      logger.debug('No roles found');
      return false;
    }

    if (result.findKey('name', 'muzik-owner')){
      logger.debug('Checking Owner permissions for', command);
      return hasPermission(ownerPermissions, command);
    }
    if (result.findKey('name', 'muzik-mods')){
      logger.debug('Checking Mod permissions for', command);
      return hasPermission(modPermissions, command);
    }
    if (result.findKey('name', 'muzik-djs')){
      logger.debug('Checking DJ permissions for', command);
      return hasPermission(djPermissions, command);
    }

    logger.debug('No permission found');
    return false;
  }
};
