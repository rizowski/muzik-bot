import { Observable } from 'rxjs/Observable';
import queue from '../../queue';

import 'rxjs/add/observable/empty';

function action() {
  queue.clear();

  return Observable.empty();
}

const command = {
  command: 'clear',
  description: 'Clears the current cached songs',
  usage: 'clear',
  action,
};

export default command;
