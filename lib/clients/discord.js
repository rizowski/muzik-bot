import { Client } from 'discord.js';
import Logger from '../logger';
import emitter from '../emitter';
import config from 'config';

const logger = Logger('discord:client');
const client = new Client();


client.on('ready', () =>{
  logger.log(`Client ${client.user.id} Ready.`);
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
  const mentions = message.mentions.users;
  if(mentions.has(client.user.id)) {
    emitter.emit('bot:aknowledge-message', { message, client });
  }
});

client.login(config.get('discord.token'))
  .catch(logger.error);

export default client;
