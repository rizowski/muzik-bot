import emitter from '../emitter';


const command = {
  command: 'help',
  cares(str){
    const regex = new RegExp(`^${command.command}`, 'i');
    return regex.test(str);
  },
  generateResponse(str, message, client){
    const username = client.user.username;
    const others = str.split('help ').join('');
    let response = 'I have the following commands: `help`, `hello`, `play`, and `skip`. Just `@' + username + '` with your command and I will oblige.';

    if(/^play/.test(others)){
      response = `\`@${username} play <url>\``;
    } else if (/^hello/.test(others)){
      response = `\`@${username} hello\``;
    }

    emitter.emit('bot:response', {
      response,
      message,
      client
    });
  }
};

export default command;
