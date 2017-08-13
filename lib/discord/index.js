import { bold } from 'chalk';

import pkg from '../../package';
import observables from './discord-obs';
import client from './client';
import createLogger from '../logger';

const logger = createLogger('discord');

const observedClient = observables.create(client);
const { ready, reconnecting, disconnected, error } = observedClient;

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

disconnected.subscribe((code, message) =>
  logger.log(code, message)
);

error.subscribe((e) =>
  logger.error(e)
);


export default observedClient;



