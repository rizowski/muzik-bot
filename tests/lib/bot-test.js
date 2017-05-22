import '../../lib/bot';
import { expect } from 'chai';
import emitter from '../../lib/emitter';

describe('bot', () => {
  let message = null;
  let client = null;
  let voiceChannel = null;
  let channel = null;
  let guild = null;

  beforeEach(() => {
    guild = {
      roles: []
    };
    channel = {};
    voiceChannel = {};
    client = {};
    message = {
      content: '<@12345> hello',
      author: {

      }
    };
  });

  it('calls command:hello given the correct permissions', (done) =>{
    emitter.once('command:hello', () =>{
      done();
    });

    emitter.emit('bot:acknowledgeMessage', { message, client, voiceChannel, channel, guild });
  });

  it('calls command:help given the correct permissions', (done) => {
    message.content = '<@1234> help';
    emitter.once('command:help', () =>{
      done();
    });

    emitter.emit('bot:acknowledgeMessage', { message, client, voiceChannel, channel, guild });
  });

  it('calls command:play');
  it('calls command:queued');
  it('calls command:shuffle');
  it('calls command:skip');
  it('calls command:stop');
});
