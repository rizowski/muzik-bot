import { Client } from 'discord.js';
import config from 'config';
import { blue } from 'chalk';

import Logger from '../logger';

const logger = Logger(`${ blue('discord') }:client`);
const client = new Client();

client.login(config.get('apiKeys.discord'))
  .catch(logger.error);

setInterval(() => {
  logger.log(client.ping);
}, 600000);

export default client;
