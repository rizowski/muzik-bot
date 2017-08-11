
/*
  {
    commandName: {
      command: 'hello',
      responses: [],
      // response: () => { }
    }
  }
*/
export default {
  commands: {
    hello: ['Hi', 'Hello', ':wave:', 'Hi there.', 'Whachuwant?', 'Howdy', 'Greetings', 'Yo dawg', ':kappa:'],
    help: function (username, commands){
      return `I have the following commands:\n\`\`\`${ commands }\`\`\`\nJust \`@${ username }\` with your command and I will oblige.\nYou can also \`@${ username } help <command>\` to get more information about a particular command`;
    },
    cache: {
      clear: [],
    },
    player: {
      play: [],
      queued: [],
      shuffle: [],
      skip: [],
      stop: [],
    }
  }
};
