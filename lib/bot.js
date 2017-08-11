import { Observable } from 'rxjs/Observable';
import without from 'lodash/without';

import Logger from './logger';
import gateKeeper from './gate-keeper';
import commandMap from './commands';

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

const logger = Logger('processor');

function appendCommand(payload) {
  const { message } = payload;
  const { content } = message;
  const parsed = without(content.split(' ').slice(1), '');
  const [command, ...commandless] = parsed;
  return Object.assign(
    {},
    payload,
    { command },
    { input: { args: commandless, string: commandless.join('') } }
  );
}

const missingCommand = '';

function invokeCommand(message) {
  const command = commandMap.find(x => x.command === message.command);
  return command
    ? command.action(message)
    : Observable.of({ response: missingCommand, message });
}

function userHasPermission({ message, server, command }) {
  return gateKeeper.allowsPassage(message, server, command);
}

export default function(source) {
  return source
    .map(appendCommand)
    .filter(userHasPermission)
    .flatMap(invokeCommand)
    .subscribe(({ response, payload }) => {
      const { message } = payload;
      logger.log(`Responding: ${response}`);
      message.channel.startTyping();
      message.channel.send(response);
      message.channel.stopTyping();
    });
}
