import { Client } from 'discord.js';
import Logger from '../logger';
import emitter from '../emitter';
import config from 'config';
import { underline, bold, blue } from 'chalk';
import { bot } from '../events';
import pkg from '../../package';
// import guardian from '../gate-keeper';

const logger = Logger(blue('discord')+':client');
const client = new Client();

function getCurrentVoiceChannel(channels, userId){
  return channels.find(c => {
    return c.type === 'voice' && c.members.has(userId);
  });
}

function pluralize(size){
  return size > 1 ? 's' : '';
}

client.on('ready', () => {
  const numServers = client.guilds.size;
  const s = pluralize(numServers);
  logger.log('Running version:', pkg.version);
  logger.log(`User: ${bold(client.user.username)}:${underline(client.user.id)} Ready.`);
  logger.log(`Active in ${numServers} server${s}`);
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
  const allChannels = guild && guild.channels || [];
  const voiceChannel = getCurrentVoiceChannel(allChannels, message.author.id);
  logger.debug(`${message.author.username} said`, message.content);

  if(userMentions.has(client.user.id)){
    emitter.emit(bot.acknowledgeMessage, { message, client, voiceChannel, channel, guild });
  }
});

client.login(config.get('apiKeys.discord'))
  .catch(logger.error);

export default client;
