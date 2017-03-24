import debug from 'debug';

export default (thing) => ({
  log: console.log.bind(console),
  error: console.error.bind(console),
  debug: debug(`muzik:${thing}`)
});
