import { expect } from 'chai';
import '../../../lib/commands/';
import emitter from '../../../lib/emitter';
import { processor, commands, bot } from '../../../lib/events';

describe('command: play', () => {
  let discord;
  before(() => {
    emitter.removeAllListeners(processor.video);
    emitter.removeAllListeners(processor.term);
    emitter.removeAllListeners(processor.playlist);
    emitter.removeAllListeners(bot.response);
  });

  beforeEach(() => {
    discord = {
      voiceChannel: 'blue'
    };
  });

  describe('search terms', () =>{
    it('calls process:term when command play is emitted', () => {
      const input = { string: 'blah blah' };

      const promise = emitter.once(processor.term, ({ terms }) => {
        expect(terms).to.equal(input.string);
      });

      emitter.emit(commands.play, { input, discord });

      return promise;
    });

    it('tells the user to put in something after play', () => {
      const input = { string: '' };

      const promise = emitter.once(bot.response, ({ response }) => {
        expect(response).to.equal('Hey! Put some spunk in that search junk!');
      });

      emitter.emit(commands.play, { input, discord });

      return promise;
    });
  });

  describe('playlist', () =>{
    it('calls process:playlist when command play is emitted', () => {
      const input = { string: 'https://www.youtube.com/playlist?list=PL3A5849BDE0581B19' };

      const promise = emitter.once(processor.playlist, ({ id }) => {
        expect(id).to.equal('PL3A5849BDE0581B19');
      });

      emitter.emit(commands.play, { input, discord });

      return promise;
    });
  });

  describe('video', () => {
    it('finds the video id from a url', () => {
      const input = { string: 'https://www.youtube.com/watch?v=Mcn1Q9fWahM&t=37s' };

      const promise = emitter.once(processor.video, ({ id }) => {
        expect(id).to.equal('Mcn1Q9fWahM');
      });

      emitter.emit(commands.play, { input, discord });

      return promise;
    });

    it("finds the video id if it isn't the first item", () => {
      const input = { string: 'https://www.youtube.com/watch?t=3s&v=Mcn1Q9fWahM' };

      const promise = emitter.once(processor.video, ({ id }) => {
        expect(id).to.equal('Mcn1Q9fWahM');
      });

      emitter.emit(commands.play, { input, discord });

      return promise;
    });
  });


});
