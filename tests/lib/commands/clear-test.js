import { expect } from 'chai';
import clearCommand from '../../../lib/commands/cache/clear';
import queue from '../../../lib/queue';

describe('command: clear', () => {
  it('clears the queue', (done) => {
    queue.enqueue('test-id-1', { title: 'test-title-1' }, {});
    expect(queue.size()).to.equal(1);

    clearCommand
      .action()
      .subscribe(
        () => { /*intentionally left empty as clear immediately completes*/ },
        done,
        () => {
          expect(queue.size()).to.equal(0);
          done();
        }
      );
  });
});
