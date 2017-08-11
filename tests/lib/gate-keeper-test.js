import { expect } from 'chai';
import sinon from 'sinon';
import config from 'config';
import gatekeeper from '../../lib/gate-keeper';

describe('gate-keeper', () => {
  let message = null;
  let server = null;
  let command = null;
  let sandbox;
  let roles;

  before(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    roles = [{
      name: 'not-it',
      members: {
        has(id){
          return '1234565' === id;
        }
      },
      findKey(){
        return true; // Checks if the role is defined in the server
      }
    }, {
      name: 'muzik-mods',
      members: {
        has(id){
          return '5421' === id;
        }
      },
      findKey(){
        return true;
      }
    },{
      name: 'muzik-djs',
      members: {
        has(id){
          return '9876554' === id;
        }
      },
      findKey(){
        return true;
      }
    }];
    message = {
      channel: {
        id: '123456'
      },
      serverOwner: false,
      author:{
        id: '1234'
      }
    };
    server = {
      roles: {
        filterArray(){
          return roles;
        }
      }
    };
    command = '';
  });



  describe('function calls', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('allowsPassage calls allowChannel and allows command', () => {
      const allowsChannel = sandbox.stub(gatekeeper, 'allowsChannel').callsFake(() => { return true; });
      const allowsCommand = sandbox.stub(gatekeeper, 'allowsCommand').callsFake(() => { return false; });

      const result = gatekeeper.allowsPassage(message, server, command);

      expect(allowsChannel.firstCall.args).to.eql([message.channel.id]);
      expect(allowsCommand.firstCall.args).to.eql([message, server, command]);

      expect(result).to.be.false;
    });

    it('short curcuits if permissions are disabled', () => {
      config.permissions.enabled = false;
      const allowsChannel = sandbox.stub(gatekeeper, 'allowsChannel').callsFake(() => { return true; });
      const allowsCommand = sandbox.stub(gatekeeper, 'allowsCommand').callsFake(() => { return true; });

      const result = gatekeeper.allowsPassage(message, server, command);

      expect(allowsChannel.called).to.be.false;
      expect(allowsCommand.called).to.be.false;

      expect(result).to.be.true;
    });

    it('short curcuits if the owner issued the commands', () => {
      message.serverOwner = true;
      const allowsChannel = sandbox.stub(gatekeeper, 'allowsChannel').callsFake(() => { return true; });
      const allowsCommand = sandbox.stub(gatekeeper, 'allowsCommand').callsFake(() => { return true; });

      const result = gatekeeper.allowsPassage(message, server, command);

      expect(allowsChannel.called).to.be.false;
      expect(allowsCommand.called).to.be.false;
      expect(result).to.be.true;
    });
  });

  describe('allowsCommand', () => {
    it('returns true if the owner is issuing the command and roles are not right', () => {
      message.serverOwner = true;

      const result = gatekeeper.allowsCommand(message, server, command);

      expect(result).to.be.true;
    });

    it('returns false if the roles are not included in the user', () => {
      roles = [];
      const result = gatekeeper.allowsCommand(message, server, command);

      expect(result).to.be.false;
    });

    it('returns true if the user is a mod', () => {
      command = 'cache';
      message.author.id = '5421';

      const result = gatekeeper.allowsCommand(message, server, command);

      expect(result).to.be.true;
    });

    it('returns false if a mod tries a command it does not have access to', () => {
      command = 'settings';

      const result = gatekeeper.allowsCommand(message, server, command);

      expect(result).to.be.false;
    });


    it('returns true if the user is a dj', () => {
      command = 'help';

      const result = gatekeeper.allowsCommand(message, server, command);

      expect(result).to.be.true;
    });

    it('returns false if a dj tries a command it does not have access to', () => {
      command = 'settings';

      const result = gatekeeper.allowsCommand(message, server, command);

      expect(result).to.be.false;
    });

    it('returns false if the command is disabled', () => {
      command = 'hello';

      const result = gatekeeper.allowsCommand(message, server, command);

      expect(result).to.be.false;
    });
  });

  describe('allowsChannel', () => {
    before(() => {
      config.restricted.channels = ['123456', '45568', '34567'];
    });

    it('returns true if a channel id is not in the restricted list', () => {
      const result = gatekeeper.allowsChannel('123345456678');

      expect(result).to.be.true;
    });

    it('returns false if a channel id is in the restricted list', () => {
      const result = gatekeeper.allowsChannel('123456');

      expect(result).to.be.false;
    });
  });
});
