import { expect } from 'chai';
import helpCommand from '../../../lib/commands/bot/help';

describe('command: help', () => {
  const discord = {
    voiceChannel: 'blue',
    original: {
      client: {
        user: {
          username: 'testy',
        },
      },
    },
  };

  describe('base help', () => {
    it('shows help text for help command', (done) => {
      const input = { string: '' };
      const handler = ({ response }) => {
        expect(response).to.equal(
          'I have the following commands:\n```play - Plays some tunes\nqueued - Shows what is queued\nshuffle - Shuffles all the songs in the current queue\nskip - Skips something nasty\nstop - Clears the Queue\nhello - Says hello\nhelp - Gives you some less than helpful information\nclear - Clears the current cached songs\nset - Used for changing settings```\nJust `@testy` with your command and I will oblige.\nYou can also `@testy help <command>` to get more information about a particular command'
        );
      };

      helpCommand
        .action({ input, payload: discord })
        .subscribe(handler, done, done);
    });

    it('shows default help text for unknown sub-command', (done) => {
      const input = { string: 'command-that-will-never-be-implemented' };
      const handler = ({ response }) => {
        expect(response).to.equal(
          'I have the following commands:\n```play - Plays some tunes\nqueued - Shows what is queued\nshuffle - Shuffles all the songs in the current queue\nskip - Skips something nasty\nstop - Clears the Queue\nhello - Says hello\nhelp - Gives you some less than helpful information\nclear - Clears the current cached songs\nset - Used for changing settings```\nJust `@testy` with your command and I will oblige.\nYou can also `@testy help <command>` to get more information about a particular command'
        );
      };

      helpCommand
        .action({ input, payload: discord })
        .subscribe(handler, done, done);
    });
  });

  describe('help', () => {
    describe('<help>', () => {
      it('shows help text for help sub-command', done => {
        const input = { string: 'help' };
        const handler = ({ response }) => {
          expect(response).to.equal(
            '`help` - Gives you some less than helpful information\n```help [command]```'
          );
        };

        helpCommand
          .action({ input, payload: discord })
          .subscribe(handler, done, done);
      });
    });

    describe('<hello>', () => {
      it('shows help text for hello sub-command', done => {
        const input = { string: 'hello' };
        const handler = ({ response }) => {
          expect(response).to.equal('`hello` - Says hello\n``````hello``````');
        };

        helpCommand
          .action({ input, payload: discord })
          .subscribe(handler, done, done);
      });
    });

    describe('<play>', () => {
      it('shows help text for play sub-command', done => {
        const input = { string: 'play' };
        const handler = ({ response }) => {
          expect(response).to.equal(
            '`play` - Plays some tunes\n```play <url>\nplay <playlistUrl>\nplay <search terms>```'
          );
        };

        helpCommand
          .action({ input, payload: discord })
          .subscribe(handler, done, done);
      });
    });

    describe('<queued>', () => {
      it('shows help text for queued sub-command', done => {
        const input = { string: 'queued' };
        const handler = ({ response }) => {
          expect(response).to.equal(
            '`queued` - Shows what is queued\n````queued````'
          );
        };

        helpCommand
          .action({ input, payload: discord })
          .subscribe(handler, done, done);
      });
    });

    describe('<shuffle>', () => {
      it('shows help text for shuffle sub-command', done => {
        const input = { string: 'shuffle' };
        const handler = ({ response }) => {
          expect(response).to.equal(
            '`shuffle` - Shuffles all the songs in the current queue\n````shuffle````'
          );
        };

        helpCommand
          .action({ input, payload: discord })
          .subscribe(handler, done, done);
      });
    });

    describe('<skip>', () => {
      it('shows help text for skip sub-command', done => {
        const input = { string: 'skip' };
        const handler = ({ response }) => {
          expect(response).to.equal(
            '`skip` - Skips something nasty\n````skip````'
          );
        };

        helpCommand
          .action({ input, payload: discord })
          .subscribe(handler, done, done);
      });
    });

    describe('<stop>', () => {
      it('shows help text for stop sub-command', done => {
        const input = { string: 'stop' };
        const handler = ({ response }) => {
          expect(response).to.equal('`stop` - Clears the Queue\n````stop````');
        };

        helpCommand
          .action({ input, payload: discord })
          .subscribe(handler, done, done);
      });
    });
  });
});
