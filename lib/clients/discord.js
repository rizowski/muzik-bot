import { Client } from 'discord.js';
import Logger from '../logger';
import emitter from '../emitter';
import config from 'config';
import { underline, bold, blue } from 'chalk';
import { bot } from '../events';

const logger = Logger(blue('discord')+':client');
const client = new Client();

function getCurrentVoiceChannel(channels, userId){
  return channels.find(c => {
    return c.type === 'voice' && c.members.has(userId);
  });
}

client.on('ready', () => {
  logger.log(`${bold(client.user.username)}:${underline(client.user.id)} Ready.`);
});

client.on('reconnecting', () =>{
  logger.log('Client is reconnecting...');
});

client.on('disconnect', () =>{
  logger.log('Client Disconnnected.');
});

client.on('error', (e) =>{
  logger.error(e);
});

client.on('message', (message) => {
  const { channel, guild, mentions } = message;
  const userMentions = mentions.users;
  const allChannels = guild.channels;
  const voiceChannel = getCurrentVoiceChannel(allChannels, message.author.id);
  logger.debug('Message Received', message.content);

  if(message.channel.type === 'dm' || userMentions.has(client.user.id)){
    emitter.emit(bot.acknowledgeMessage, { message, client, voiceChannel, channel });
  }
});

client.login(config.get('discord.token'))
  .catch(logger.error);

export default client;
