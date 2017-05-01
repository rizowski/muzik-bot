import '../../../lib/commands/';
import emitter from '../../../lib/emitter';
import { player, commands, bot, queue } from '../../../lib/events';

describe('command: stop', () => {
  let discord;
  before(() => {
    // emitter.removeAllListeners(commands.stop);
    emitter.removeAllListeners(player.stop);
    // emitter.removeAllListeners(queue.clear);
    emitter.removeAllListeners(bot.response);
  });

  beforeEach(() => {
    discord = {
      voiceChannel: 'blue'
    };
  });

  afterEach(() =>{
    emitter.removeAllListeners(player.stop);
    // emitter.removeAllListeners(queue.clear);
  });

  it(`calls ${player.stop}`, (done) => {
    const input = { string: '' };
    const handler = () => {
      done();
    };

    emitter.once(player.stop, handler);

    emitter.emit(commands.stop, { input, discord });
  });

  //TODO: needs commands:play to work

  it.skip(`calls ${queue.clear}`, (done) =>{
    const input = { string: '' };
    const handler = () => {
      done();
    };

    emitter.once(queue.clear, handler);

    emitter.emit(commands.stop, { input, discord });
  });


});
