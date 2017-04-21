import emitter from '../lib/emitter';
import { expect } from 'chai';

describe('emitter', () => {

  it('does promises with on', () =>{
    const promise = emitter.on('test', (string) =>{
      return Promise.resolve(string);
    }).then((string) =>{
      expect(string).to.equal('testing');
    });

    emitter.emit('test', 'testing');
    return promise;
  });

  it('does promises with once', () =>{
    const promise = emitter.once('test', (string) =>{
      return Promise.resolve(string);
    }).then((string) =>{
      expect(string).to.equal('testing');
    });

    emitter.emit('test', 'testing');
    return promise;
  });
});
