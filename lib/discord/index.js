import { bold } from 'chalk';

import pkg from '../../package';
import observables from './discord-obs';
import client from './client';
import createLogger from '../logger';

const logger = createLogger('discord');

const observedClient = observables.create(client);
const { ready, reconnecting, disconnected, error, warn } = observedClient;

function pluralize(size) {
  return size > 1 ? 's' : '';
}

ready.subscribe(() => {
  const numServers = client.guilds.size;
  const s = pluralize(numServers);
  logger.log(`${bold(client.user.username)} v${pkg.version}`);
  logger.log(`server${s}: ${numServers} text-channels: ${client.channels.size} users: ${client.users.size}`);
});

reconnecting.subscribe(() =>
  logger.log('reconnecting...')
);

disconnected.subscribe(logger.log);

error.subscribe(logger.error);

warn.subscribe(logger.warn);


export default observedClient;
