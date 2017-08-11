import { expect } from 'chai';
import helloCommand from '../../../lib/commands/bot/hello';

describe.only('command: hello', () => {
  const responses = ['Hi', 'Hello', ':wave:', 'Hi there.', 'Whachuwant?', 'Howdy', 'Greetings', 'Yo dawg', ':kappa:'];

  it('returns some response', (done) => {
    helloCommand.action({ payload: {} })
      .subscribe(
        ({ response }) => {
          expect(responses).to.include(response);
        },
        done, // error
        done // complete
      );
  });

});
