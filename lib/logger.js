import debug from 'debug';

export default (thing) => ({
  log: console.log.bind(console, `[${thing}]`),
  error: console.error.bind(console, `[${thing}]`),
  debug: debug(`muzik:${thing}`)
});
