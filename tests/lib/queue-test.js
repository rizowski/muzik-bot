import { expect } from 'chai';
import queue from '../../lib/queue';

describe('queue', () => {
  describe('#enqueue', () => {
    beforeEach(() => {
      queue.clear();
    });

    it('adds item to queue', () => {
      const id = '';
      const info = { title: 'test' };
      const discord = {};
      queue.enqueue(id, info, discord);
      const result = queue.dequeue();
      expect(result).have.property('id').and.to.eql(id);
      expect(result).have.property('info').and.to.eql(info);
      expect(result).have.property('discord').and.to.eql(discord);
    });

    it('returns item queued', () => {
      const id = '';
      const info = { title: 'test' };
      const discord = {};
      const result = queue.enqueue(id, info, discord);
      expect(result).have.property('id').and.to.eql(id);
      expect(result).have.property('info').and.to.eql(info);
      expect(result).have.property('discord').and.to.eql(discord);
    });

    it('makes a copy of data queued', () => {
      const id = '';
      const info = { title: 'test' };
      const discord = {};
      const result = queue.enqueue(id, info, discord);
      // reference equality
      expect(result).have.property('discord').and.to.not.equal(discord);
    });
  });

  describe('#dequeue', () => {
    beforeEach(() => {
      queue.clear();
    });

    it('dequeues the top item', () => {
      queue.enqueue('test-1', { title: 'test-1' }, {});
      queue.enqueue('test-2', { title: 'test-2' }, {});

      const result = queue.dequeue();
      expect(result).to.have.property('id').and.to.equal('test-1');
    });

    it('returns null if no items enqueued', () => {
      const result = queue.dequeue();
      expect(result).to.be.null;
    });
  });

  describe('#clear', () => {
    it('empties the queue', () => {
      queue.enqueue('', {}, {});
      expect(queue.size()).to.equal(1);
      queue.clear();
      expect(queue.size()).to.equal(0);
    });
  });

  describe('#shuffle', () => {
    it('shuffles the order of the queue', () => {
      [...Array(15).keys()].map(i => {
        queue.enqueue(`item-${i + 1}`, { title: `item-${i + 1}-title` }, {});
      });

      queue.shuffle();

      expect(queue.dequeue()).to.have.property('id').and.to.not.equal('item-1');
    });
  });

  describe('#print', () => {
    beforeEach(() => {
      queue.clear();
    });

    it('returns a formatted string of item in the queue', () => {
      queue.enqueue('item-1', { title: 'item-1-title' }, {});
      const ends = '```';
      const result = queue.print();
      expect(result).to.equal(`${ends}1 item-1-title${ends}`);
    });

    it('returns less at most 10 items', () => {
      [...Array(15).keys()].map(i => {
        queue.enqueue(`item-${i + 1}`, { title: `item-${i + 1}-title` }, {});
      });

      const ends = '```';
      const result = queue.print();
      expect(queue.size()).to.equal(15);
      expect(result).to.equal(`${ends}1 item-1-title
2 item-2-title
3 item-3-title
4 item-4-title
5 item-5-title
6 item-6-title
7 item-7-title
8 item-8-title
9 item-9-title
10 item-10-title${ends}`);
    });
  });
});
