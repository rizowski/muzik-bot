import { expect } from 'chai';
import '../../../lib/commands/';
import emitter from '../../../lib/emitter';
import { bot, commands } from '../../../lib/events';

describe('command: help', () => {
  let discord;

  before(() => {
    emitter.removeAllListeners(bot.response);
  });

  beforeEach(() => {
    discord = {
      voiceChannel: 'blue',
      client: {
        user: {
          username: 'testy'
        }
      }
    };
  });

  describe('base help', () => {
    it(`calls ${bot.response} when ${commands.help} is emitted`, () => {
      const input = { string: '' };
      const handler = ({ response }) => {
        expect(response).to.equal('I have the following commands:\n```play - Plays some tunes\nskip - Skips something nasty\nhelp - Gives you some less than helpful information\nhello - Says hello\nstop - Clears the Queue\nqueued - Shows what is queued\nshuffle - Shuffles all the songs in the current queue\nset - Used for changing settings```\nJust `@testy` with your command and I will oblige.\nYou can also `@testy help <command>` to get more information about a particular command');
      };

      const promise = emitter.once(bot.response, handler);

      emitter.emit(commands.help, { input, discord });

      return promise;
    });
  });

  describe('help', () => {
    describe('<help>', () => {
      it(`calls ${bot.response} when ${commands.help} help is emitted`, () => {
        const input = { string: 'help' };
        const handler = ({ response }) => {
          expect(response).to.equal('`help` - Gives you some less than helpful information\n```help [command]```');
        };

        const promise = emitter.once(bot.response, handler);

        emitter.emit(commands.help, { input, discord });

        return promise;
      });
    });

    describe('<hello>', () =>{
      it(`calls ${bot.response} when ${commands.help} hello is emitted`, () => {
        const input = { string: 'hello' };
        const handler = ({ response }) => {
          expect(response).to.equal('`hello` - Says hello\n``````hello\nhi\nyo``````');
        };

        const promise = emitter.once(bot.response, handler);

        emitter.emit(commands.help, { input, discord });

        return promise;
      });
    });

    describe('<play>', () =>{
      it(`calls ${bot.response} when ${commands.help} play is emitted`, () => {
        const input = { string: 'play' };
        const handler = ({ response }) => {
          expect(response).to.equal('`play` - Plays some tunes\n```play <url>\nplay <playlistUrl>\nplay <search terms>```');
        };

        const promise = emitter.once(bot.response, handler);

        emitter.emit(commands.help, { input, discord });

        return promise;
      });
    });

    describe('<queued>', () =>{
      it(`calls ${bot.response} when ${commands.help} queued is emitted`, () => {
        const input = { string: 'queued' };
        const handler = ({ response }) => {
          expect(response).to.equal('`queued` - Shows what is queued\n````queued````');
        };

        const promise = emitter.once(bot.response, handler);

        emitter.emit(commands.help, { input, discord });

        return promise;
      });
    });

    describe('<shuffle>', () =>{
      it(`calls ${bot.response} when ${commands.help} shuffle is emitted`, () => {
        const input = { string: 'shuffle' };
        const handler = ({ response }) => {
          expect(response).to.equal('`shuffle` - Shuffles all the songs in the current queue\n````shuffle````');
        };

        const promise = emitter.once(bot.response, handler);

        emitter.emit(commands.help, { input, discord });

        return promise;
      });
    });

    describe('<skip>', () =>{
      it(`calls ${bot.response} when ${commands.help} skip is emitted`, () => {
        const input = { string: 'skip' };
        const handler = ({ response }) => {
          expect(response).to.equal('`skip` - Skips something nasty\n````skip````');
        };

        const promise = emitter.once(bot.response, handler);

        emitter.emit(commands.help, { input, discord });

        return promise;
      });
    });

    describe('<stop>', () =>{
      it(`calls ${bot.response} when ${commands.help} stop is emitted`, () => {
        const input = { string: 'stop' };
        const handler = ({ response }) => {
          expect(response).to.equal('`stop` - Clears the Queue\n````stop````');
        };

        const promise = emitter.once(bot.response, handler);

        emitter.emit(commands.help, { input, discord });

        return promise;
      });
    });
  });
});
