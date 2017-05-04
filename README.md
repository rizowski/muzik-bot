# muzik-bot

Muzik-bot is a competitor of [MusicBot](https://github.com/Just-Some-Bots/MusicBot). Why? Because when I would try to run MusicBot for an extended amount of time it would crash. With the large number of issues and lack of project support, Muzik-bot was born. With Muzik-bot you will find that it stable and faster than other competitors.

## requirements

  - Node: `6`

### Mac OSX

  - xCode
    - Set developer tools: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
  - Node: `6`
  - `brew install ffmpeg`

## Getting Started

Below is how to get the bot running either with command line or a docker container.

## config

The config settings are pretty self explanatory, but in the case that they're not here is a brief overview of what they mean.

```js
{
  player: {
    // Volume of the bot. 0.2 seems to be a comfortable non-ear-blasting level
    volume: 0.2,
  },
  youtube: {
    // Your Youtube api Key (not OAuth 2.0)
    // https://developers.google.com/youtube/registering_an_application
    apiKey: 'YT_API_KEY'
  },
  discord: {
    // The bot's discord token
    // https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord
    token: 'DISCORD_TOKEN'
  },
  streaming: {
    // This is the number of times the bot will send packets to the server.
    // 1 is 1x the amount of bandwidth. 2 is 2x and so on...
    // Not recommended to go above 5
    passes: 2
  },
  permissions: {

  }
};
```

## Node

  - Optional: `npm i -g nodemon`
  - `git clone git@github.com:rizowski/muzik-bot.git`
  - `cd muzik-bot`
  - `npm i`
  - `npm start` or `nodemon .`


### Docker

> comming soon...
