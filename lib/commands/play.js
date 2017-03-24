import emitter from '../emitter';

const command = {
  command: 'play',
  cares(str){
    const regex = new RegExp(`^${command.command}`, 'i');
    return regex.test(str);
  },
  generateResponse(str, message, client){
    const channel = message.member.voiceChannel;

    if(!channel){
      emitter.emit('bot:response', {
        response: 'You need to be in a voice channel for me to play you sweet things into your ear.',
        message,
        client
      });

      return;
    }

    const url = str.split('play ').join('').split('play').join('');

    if(!url){
      emitter.emit('bot:response', {
        response: 'Hey! Put some spunk in that search junk!',
        message,
        client
      });

      return;
    }

    if(/\?list=/.test(url)){
      const id = url.split('?list=')[1];
      emitter.emit('process:playlist', { id, channel, message, client });
    } else if (/\?v=/.test(url)){
      const id = url.split('?v=')[1];
      emitter.emit('process:video', { id, channel, message, client });
    } else {
      emitter.emit('process:term', { terms: url, channel, message, client });
    }

    emitter.emit('discord:play', { url, channel, message, client });
  }
};

export default command;
