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
    channel = {
      startTyping() {

      },
      stopTyping(){

      },
    };
    voiceChannel = {};
    client = {};
    message = {
      content: '<@12345> hello',
      author: {

      },
      channel:{
        sendMessage(){

        }
      }
    };
  });

  it.only('calls command:hello given the correct permissions', () =>{
    const promise = emitter.once('command:hello', (stuff) =>{
      console.log(stuff)
    });

    emitter.emit('bot:acknowledgeMessage', { message, client, voiceChannel, channel, guild });

    return promise;
  });

  it('calls command:help given the correct permissions', () => {
    message.content = '<@1234> help';
    const promise = emitter.once('command:help', () =>{
    });

    emitter.emit('bot:acknowledgeMessage', { message, client, voiceChannel, channel, guild });

    return promise;
  });

  it('calls command:play');
  it('calls command:queued');
  it('calls command:shuffle');
  it('calls command:skip');
  it('calls command:stop');
});
