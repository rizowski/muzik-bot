import { expect } from 'chai';
import '../../../lib/commands/';
import emitter from '../../../lib/emitter';
import { bot } from '../../../lib/events';

describe('command: hello', () => {
  let discord;
  const responses = ['Hi', 'Hello', ':wave:', 'Hi there.', 'Whachuwant?', 'Howdy', 'Greetings', 'Yo dawg', ':kappa:'];

  before(() => {
    emitter.removeAllListeners(bot.response);
  });

  beforeEach(() => {
    discord = {
      voiceChannel: 'blue'
    };
  });

  it(`calls ${bot.response} when command:hello is emitted`, () => {
    const input = { string: '' };
    const handler = ({ response }) => {
      expect(responses).to.include(response);
    };

    const promise = emitter.once(bot.response, handler);

    emitter.emit('command:hello', { input, discord });

    return promise;
  });

  it(`calls ${bot.response} when command:hi is emitted`, () => {
    const input = { string: '' };
    const handler = ({ response }) => {
      expect(responses).to.include(response);
    };

    const promise = emitter.once(bot.response, handler);

    emitter.emit('command:hi', { input, discord });

    return promise;
  });

  it(`calls ${bot.response} when command:yo is emitted`, () => {
    const input = { string: '' };
    const handler = ({ response }) => {
      expect(responses).to.include(response);
    };

    const promise = emitter.once(bot.response, handler);

    emitter.emit('command:yo', { input, discord });

    return promise;
  });
});
