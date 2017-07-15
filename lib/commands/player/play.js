import emitter from '../../emitter';
import { processor, bot, commands } from '../../events';
import parse from 'url-parse';
import queryParser from 'query-string';
import Logger from '../../logger';

const logger = Logger('command:play');

function tellThem(response, discord){
  emitter.emit(bot.response, {
    response,
    discord
  });
}

emitter.on(commands.play, ({ input, discord }) => {
  const { voiceChannel } = discord;
  const { string } = input;

  logger.debug(string);

  if(!voiceChannel){
    logger.debug('Exiting command. User not in voice channel');
    return tellThem('You need to be in a voice channel for me to play you sweet things into your ear.', discord);
  }
  if(!string){
    logger.debug('Exiting command. User not entering text');
    return tellThem('Hey! Put some spunk in that search junk!', discord);
  }

  if(/http(s)?/.test(string)){
    const url = parse(string);
    const queryParams = queryParser.parse(url.query);

    if(queryParams.list){
      emitter.emit(processor.playlist, { id: queryParams.list, discord });
    } else if (queryParams.v){
      emitter.emit(processor.video, { id: queryParams.v, discord });
    } else {
      emitter.emit(processor.video, { id: string, discord });
    }
  } else {
    emitter.emit(processor.term, { terms: string, discord });
  }
});

const usage = [
  'play <url>',
  'play <playlistUrl>',
  'play <search terms>'
].join('\n');

const play = {
  command: 'play',
  description: 'Plays some tunes',
  usage
};

export default play;
