/*
  This is where config changes should be made.
*/
module.exports = {
  player: {
    volume: 0.05, // 0.05 seems to be a good number
  },
  apiKeys: {
    youtube: '',
    discord: ''
  },
  // youtube: {
  //   apiKey: 'KEY GOES HERE' // or set process.env.YT_API_KEY
  // },
  // discord: {
  //   token: 'TOKEN.GOES.HERE' // or set process.env.DISCORD_TOKEN
  // },
  streaming: {
    passes: 2  // Discord reccomends not going above 5.
  },
  permissions: {
    enabled: false
  }
};
