export default {
  processor: {
    term: 'process:terms',
    playlist: 'process:playlist',
    video: 'process:video',
  },
  queue: {
    song: 'queue:song',
    queued: 'queue:queued',
    add: 'queue:add',
    clear: 'queue:clear',
    shuffle: 'queue:shuffle',
    print: 'queue:print-queued',
    next: 'queue:next'
  },
  bot: {
    acknowledgeMessage: 'bot:acknowledgeMessage',
    response: 'bot:respond'
  },
  commands: {
    play: 'command:play',
    hello: 'command:hello',
    help: 'command:help',
    queued: 'command:queued',
    skip: 'command:skip',
    stop: 'command:stop'
  },
  clients: {
    discord: {
      ready: 'ready',
      reconnecting: 'reconnecting',
      disconnect: 'disconnect',
      message: 'message'
    }
  },
  errors: {
    play: {
      search: 'error:play:search',
    }
  }
};
