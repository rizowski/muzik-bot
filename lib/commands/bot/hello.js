import { Observable } from 'rxjs/Observable';
import Logger from '../../logger';

import 'rxjs/add/observable/of';

const logger = Logger('command:hello');

const responses = ['Hi', 'Hello', ':wave:', 'Hi there.', 'Whachuwant?', 'Howdy', 'Greetings', 'Yo dawg', ':kappa:'];

function action({ payload }) {
  logger.debug('triggered');
  const random = Math.floor(Math.random() * responses.length);
  const response = responses[random];
  return Observable.of({ response, payload });
}

const ends = '```';
const usage = 'hello';

const command = {
  command: 'hello',
  description: 'Says hello',
  usage: `${ends}${usage}${ends}`,
  action,
};

export default command;
