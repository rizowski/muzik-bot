import emitter from '../lib/emitter';
import { expect } from 'chai';

describe.skip('emitter', () => {
  beforeEach(() =>{
    emitter.removeAllListeners('test');
  });

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

  it("does not throw any errors if a promise isn't returned", (done) => {
    emitter.once('test', (data) =>{
      expect(data).to.equal('yes');
      done();
    });

    emitter.emit('test', 'yes');
  });

  it('rejects a promise if an exception is thrown', (done) => {
    emitter.once('test', () =>{
      throw new Error('twerks');
    }).catch(e =>{
      expect(e.message).to.equal('twerks');
      done();
    });

    emitter.emit('test', 'yes');
  });
});
