import emitter from './emitter';
import Logger from './logger';
import yt from './sources/youtube';
import Q from './queue';
import config from 'config';
import { cyan, yellow, green } from 'chalk';
import { player, queue } from './events';

const logger = Logger(green('music-player'));

let playing = null;

emitter.on('queue:add', () =>{
  if(!playing){
    emitter.emit('player:play', Q.next());
  }
});

emitter.on(player.next, () => {
  const nextUp = Q.next();
  if(!nextUp){
    logger.log(yellow('End of Queue'));
    return;
  }
  emitter.emit(player.play, nextUp);
});

emitter.on(player.play, async ({ id, info, discord }) => {
  playing = { id, info, discord };
  const { message, voiceChannel, client } = discord;
  const textChannel = message.channel;

  textChannel.startTyping();
  const loading = await textChannel.send(`Loading... ${info.title}`);
  const stream = await yt.download(id, { filename: info.title.toLowerCase().replace(/[^a-zA-Z ]/g, '') });
  textChannel.stopTyping();

  const connection = await voiceChannel.join();

  const dispatcher = connection.playStream(stream, {
    seek: 0,
    volume: config.get('player.volume'),
    passes: config.get('streaming.passes')
  });

  dispatcher.on('error', (e) =>{
    logger.error(e);
    playing = null;
  });

  dispatcher.on('start', () =>{
    logger.log('Playing', cyan(info.title));
    client.user.setGame(info.title);
    loading.delete();
  });

  dispatcher.on('debug', logger.debug);

  stream.on('end', () => {
    logger.debug('Stream closed');
    playing = null;
  });

  dispatcher.once('end', (reason) =>{
    logger.debug('Dispatcher closed:', yellow(reason));
    playing = null;
    client.user.setGame(null);
    emitter.emit(player.next);
  });

  emitter.once(player.skip, () =>{
    dispatcher.end();
  });

  emitter.once(player.stop, () =>{
    emitter.emit(queue.clear);
    client.user.setGame(null);
    dispatcher.end();
  });
});
