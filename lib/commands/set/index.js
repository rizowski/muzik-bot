import emitter from '../../emitter';
import { commands } from '../../events';

emitter.on(commands.set, ({ input }) =>{
  console.log(input.string);
});


const set = {
  command: 'set',
  description: 'Used for changing settings',
  usage: 'Not ready...'
};

export default set;
