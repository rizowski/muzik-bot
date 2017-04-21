import EventEmitter from 'events';



class CustomEmitter extends EventEmitter{
  constructor(){
    super();
  }

  _promised(event, handler){
    return new Promise((resolve, reject) => {
      super.on(event, (...args) => {
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
    });
  }

  on(event, handler) {
    return this['_promised'](event, handler);
  }

  once(event, handler){
    return this['_promised'](event, handler);
  }
}

const emitter = new CustomEmitter();

export default emitter;
