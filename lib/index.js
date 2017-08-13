import discord from './discord';
import bot from './bot';
import createLogger from './logger';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';

const logger = createLogger('bot');

const { message, client } = discord;

function getVoiceChannelForUser(channels, userId) {
  return channels.find(c => {
    return c.type === 'voice' && c.members.has(userId);
  });
}

function getChannelsByType(channels, type) {
  return channels.find(c => c.type === type);
}

function botWasMentioned(discordMessage) {
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


const messageFiltered = message
  .filter(botWasMentioned)
  .map(transformDiscordMessage);

export default bot.process(messageFiltered);
