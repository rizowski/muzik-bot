import EventEmitter from 'events';

class CustomEmitter extends EventEmitter{
  constructor(){
    super();
  }

  _promised(func, event, handler){
    return new Promise((resolve, reject) => {
      super[func](event, (...args) => {
        try{
          const promise = handler(...args);
          if (promise && promise.then) {
            return promise
              .then(resolve)
              .catch(reject);
          }
          return resolve();
        } catch (e){
          return reject(e);
        }
      });
    })
      .catch((e) => {
        super.emit('error', e);

        throw e;
      });
  }

  on(event, handler) {
    return this['_promised']('on', event, handler);
  }

  once(event, handler){
    return this['_promised']('once', event, handler);
  }
}

const emitter = new CustomEmitter();

emitter.on('error', error => console.error(process.env.DEBUG ? error : error.message));

export default emitter;
