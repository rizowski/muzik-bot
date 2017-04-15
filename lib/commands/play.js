import emitter from '../emitter';

function tellThem(response, discord){
  emitter.emit('bot:response', {
    response,
    discord
  });
}

emitter.on('command:play', ({ input, discord }) =>{
  const { message } = discord;
  const { string } = input;
  const channel = message.member.voiceChannel;

  if(!channel){
    return tellThem('You need to be in a voice channel for me to play you sweet things into your ear.', discord);
  }
  if(!string){
    return tellThem('Hey! Put some spunk in that search junk!', discord);
  }

  if(/\?list=/.test(string)){
    const id = string.split('?list=')[1];
    emitter.emit('process:playlist', { id, discord });
  } else if (/\?v=/.test(string)){
    const id = string.split('?v=')[1];
    emitter.emit('process:video', { id, discord });
  } else if(/youtu\.be\//.test(string)){
    const id = string;
    emitter.emit('process:video', { id, discord });
  } else {
    emitter.emit('process:term', { terms: string, discord });
  }

  emitter.emit('discord:play', { url: string, discord });
});

const commands = [
  'play <url>',
  'play <playlistUrl>',
  'play <search term>'
].join('\n');
const ends = '```';

const command = {
  command: 'play',
  description: 'Plays some tunes',
  usage: `${ends}${commands}${ends}`
};

export default command;
