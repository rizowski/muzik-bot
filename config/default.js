module.exports = {
  player: {
    volume: 0.2,
    cache: false,
  },
  cache: {
    location: ''
  },
  apiKeys: {
    discord: 'MzM1NTI1MDcyNjQxMDY0OTYx.DErBnw.kx3xtPzzFZLeCwGgyqpht4Lbw_Y',
    youtube: 'AIzaSyA-Wr9SqyKXkMtXSKy5iRbLKkmHjXtA2Kg'
  },
  streaming: {
    passes: 1
  },
  restricted: {
    commands: ['bot.hello'],
    channels: []
  },
  permissions: {
    enabled: true,
    owner: [
      'player.settings',
      'cache.settings'
    ],
    mod: [
      'player.volume',
      'cache.clean'
    ],
    dj: [
      'bot.help',
      'bot.hello',
      'player.play',
      'player.queued',
      'player.skip',
      'player.stop',
      'player.shuffle'
    ]
  }
};
