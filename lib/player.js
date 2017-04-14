import emitter from './emitter';
import Logger from './logger';
import yt from './sources/youtube';
import queue from './queue';
import config from 'config';
import { cyan, yellow, orange } from 'chalk';

const logger = Logger('music-player');

let playing = false;

emitter.on('queue:add', () =>{
  if(!playing){
    emitter.emit('player:play', queue.next());
  }
});

emitter.on('player:next', () => {
  const nextUp = queue.next();
  if(!nextUp){
    logger.log(yellow('End of Queue'));
    return;
  }
  emitter.emit('player:play', nextUp);
});

emitter.on('player:play', async ({ id, info, discord }) => {
  playing = true;
  const { message, channel } = discord;
  const textChannel = message.channel;

  textChannel.startTyping();
  const loading = await textChannel.send(`Loading... ${info.title}`);
  const stream = await yt.download(id, { filename: info.title.toLowerCase().replace(/[^a-zA-Z ]/g, '') });
  textChannel.stopTyping();

  const connection = await channel.join();

  const dispatcher = connection.playStream(stream, { seek: 0, volume: config.get('player.volume'), passes: config.get('streaming.passes') });

  dispatcher.on('error', (e) =>{
    logger.error(e);
    playing = false;
  });

  dispatcher.on('start', () =>{
    logger.log('Playing', cyan(info.title));
    loading.delete();
  });

  dispatcher.on('debug', logger.debug);

  stream.on('end', () => {
    logger.debug('Stream closed');
    playing = false;
    // dispatcher.end();
  });

  dispatcher.once('end', (reason) =>{
    logger.log('dispatcher closed', orange(reason));
    playing = false;
    emitter.emit('player:next');
  });

  emitter.once('player:skip', () =>{
    dispatcher.end();
  });
});
