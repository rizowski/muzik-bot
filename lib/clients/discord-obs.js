// TODO: Split client instantiation and observable wire-up to separate files
//       to allow for better testing capabilities.
//         (ex const client = discordClient; listenToClient(client))

import { Observable } from 'rxjs/Observable';
import { Client } from 'discord.js';
import pkg from '../../package';
import createLogger from '../logger';
import { bold, blue } from 'chalk';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

const logger = createLogger(blue('discord') + ':client');
const client = new Client();

function getVoiceChannelForUser(channels, userId) {
  return channels.find(c => {
    return c.type === 'voice' && c.members.has(userId);
  });
}

function getChannelsByType(channels, type) {
  return channels.find(c => c.type === type);
}

function pluralize(size) {
  return size > 1 ? 's' : '';
}

Observable.fromEvent(client, 'ready').subscribe(() => {
  const numServers = client.guilds.size;
  const s = pluralize(numServers);
  logger.log(`${bold(client.user.username)} v${pkg.version}`);
  logger.log(
    `server${s}: ${numServers} channels: ${client.channels.size} users: ${client
      .users.size}`
  );
});

Observable.fromEvent(client, 'reconnecting').subscribe(() =>
  logger.log('reconnecting...')
);

Observable.fromEvent(client, 'disconnect').subscribe(() =>
  logger.log('disconnected.')
);

Observable.fromEvent(client, 'error').subscribe(e => logger.error(e));

function botWasCalled(discordMessage) {
  const { channel, mentions } = discordMessage;
  const userMentions = mentions.users;

  return userMentions.has(client.user.id) || channel.type === 'dm';
}

function transformDiscordMessage(discordMessage) {
  const { content, author, channel, guild, member, mentions } = discordMessage;
  const userMentions = mentions.users;
  const allChannels = (guild && guild.channels) || [];
  const owner = (guild && guild.owner) || {};
  const users = (guild && guild.members) || [];
  const roles = (guild && guild.roles) || [];

  logger.debug(`${author.username} said`, content);

  // TODO: DM can only apply settings or ask for help
  const currentVoiceChannel = getVoiceChannelForUser(allChannels, author.id);
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
      channel,
    },
    server: {
      owner,
      channels: {
        voice,
        text,
        currentVoiceChannel,
      },
      users,
      roles,
    },
    original: {
      message: discordMessage,
      client,
    },
  };

  return payload;
}

export default Observable.fromEvent(client, 'message')
  .filter(botWasCalled)
  .map(transformDiscordMessage);
