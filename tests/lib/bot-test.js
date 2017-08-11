import '../../lib/bot';
import { expect } from 'chai';
import emitter from '../../lib/emitter';

describe.skip('bot', () => {
  let payload = null;
  let message = null;
  let client = null;
  let voiceChannel = null;
  let channel = null;
  let guild = null;

  beforeEach(() => {
    payload = {
      message: {
        serverOwner: false,
        direct: false,
        author: {},
        member: {},
        content: '<@12345> hello',
        userMentions: [],
        channel: {}
      },
      server: {
        owner: {},
        channels: {
          voice: [],
          text: [],
          currentVoiceChannel: {},
        },
        users: [],
        roles: []
      },
      original: {
        message: {},
        client: {}
      }
    };
  });

  it('calls command:hello given the correct permissions', (done) =>{
    const promise = emitter.once('command:hello', (thing) => {
      done();
    });

    emitter.emit('bot:acknowledgeMessage', payload);

    return promise;
  });

  it('calls command:help given the correct permissions', () => {
    message.content = '<@1234> help';
    const promise = emitter.once('command:help', () =>{
    });

    emitter.emit('bot:acknowledgeMessage', payload);

    return promise;
  });

  it('calls command:play');
  it('calls command:queued');
  it('calls command:shuffle');
  it('calls command:skip');
  it('calls command:stop');
});
