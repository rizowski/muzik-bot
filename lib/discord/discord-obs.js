import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';

export default {
  create(client){
    return {
      client,
      ready: Observable.fromEvent(client, 'ready'),
      reconnecting: Observable.fromEvent(client, 'reconnecting'),
      message: Observable.fromEvent(client, 'message'),
      disconnected: Observable.fromEvent(client, 'disconnect'),
      error: Observable.fromEvent(client, 'error')
    };
  }
};
