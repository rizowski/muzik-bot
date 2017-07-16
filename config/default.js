module.exports = {
  player: {
    volume: 0.2,
    cache: false,
  },
  cache: {
    location: ''
  },
  apiKeys: {
    discord: 'jwt here',
    youtube: 'token here'
  },
  streaming: {
    passes: 1
  },
  restricted: {
    commands: ['bot.hello'],
    channels: []
  },
  permissions: {
    enabled: false,
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
