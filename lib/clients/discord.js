import { Client } from 'discord.js';
import Logger from '../logger';
import emitter from '../emitter';
import config from 'config';
import { bold, blue } from 'chalk';
import { bot } from '../events';
import pkg from '../../package';
// import guardian from '../gate-keeper';

const logger = Logger(blue('discord')+':client');
const client = new Client();

function getVoiceChannelForUser(channels, userId){
  return channels.find(c => {
    return c.type === 'voice' && c.members.has(userId);
  });
}

function getChannelsByType(channels, type){
  return channels.find(c => {
    return c.type === type;
  });
}

function pluralize(size){
  return size > 1 ? 's' : '';
}

client.on('ready', () => {
  const numServers = client.guilds.size;
  const s = pluralize(numServers);
  logger.log(`${bold(client.user.username)} v${ pkg.version }`);
  logger.log(`server${s}: ${numServers} channels: ${ client.channels.size } users: ${ client.users.size }`);
});

client.on('reconnecting', () => {
  logger.log('reconnecting...');
});

client.on('disconnect', () => {
  logger.log('disconnnected.');
});

client.on('error', (e) => {
  logger.error(e);
});

client.on('message', (message) => {
  const { content, author, channel, guild, member, mentions } = message;
  const userMentions = mentions.users;
  const allChannels = guild && guild.channels || [];
  const owner = guild && guild.owner || {};
  const users = guild && guild.members || [];
  const roles = guild && guild.roles || [];

  logger.debug(`${author.username} said`, message.content);

  if(userMentions.has(client.user.id) || channel.type === 'dm'){
    // TODO: DM can only apply settings or ask for help
    const currentVoiceChannel = getVoiceChannelForUser(allChannels, message.author.id);
    const text = getChannelsByType(allChannels, 'text');
    const voice = getChannelsByType(allChannels, 'voice');

    const payload = {
      message: {
        serverOwner: owner.id === author.id,
        author,
        member,
        content,
        userMentions,
        direct: channel.type === 'dm',
        channel
      },
      server: {
        owner,
        channels: {
          voice,
          text,
          currentVoiceChannel
        },
        users,
        roles
      },
      original: {
        message,
        client
      }
    };

    emitter.emit(bot.acknowledgeMessage, payload);
  }
});

client.login(config.get('apiKeys.discord'))
  .catch(logger.error);

export default client;
