'use strict';

var chai = chai || require('chai');
var bitcore = bitcore || require('../bitcore');

var should = chai.should();

var PrivateKeyModule = bitcore.PrivateKey;
var PrivateKey;

var networks = bitcore.networks;

describe('PrivateKey', function() {
  it('should initialze the main object', function() {
    should.exist(PrivateKeyModule);
  });
  it('should be able to create class', function() {
    PrivateKey = PrivateKeyModule;
    should.exist(PrivateKey);
  });
  it('should be able to create instance', function() {
    var pk = new PrivateKey();
    should.exist(pk);
  });
  it('should convert hex testnet private key with compressed public key to base58check format', function() {
    var hex = 'b9f4892c9e8282028fea1d2667c4dc5213564d41fc5783896a0d843fc15089f3';
    var buf = new Buffer(hex, 'hex');
    var privkey = new PrivateKey(networks.testnet.privKeyVersion, buf, true);

    privkey.as('base58').should.equal('cTpB4YiyKiBcPxnefsDpbnDxFDffjqJob8wGCEDXxgQ7zQoMXJdH');
  });

  it('should be able to detect network from privatekey', function() {
    var a = new PrivateKey('cMu64LfQqrPC83SjJqde4mZ5jzC48zyeKbUZbTjQdh6pa1h48TdM');
    a.network().name.should.equal('testnet');
    var a = new PrivateKey('cS62Ej4SobZnpFQYN1PEEBr2KWf5sgRYYnELtumcG6WVCfxno39V');
    a.network().name.should.equal('testnet');

    //compress flag = on
    var a = new PrivateKey('XHBKH9PdyQ4qB7DMrAs3HTamdCCTZtopmK8nsYtECCsJSZxWttYP');
    a.network().name.should.equal('livenet');

    //compress flag = off
    var a = new PrivateKey('7rtGvW68UH6rRwsqDxFWX1aw4fneHWs2m2PcKFUU1Gq6mKmYQ31');
    a.network().name.should.equal('livenet');
  });

  describe('#isValid', function() {
    it('should detect this private key as valid', function() {
      var privKey = new PrivateKey('7rtGvW68UH6rRwsqDxFWX1aw4fneHWs2m2PcKFUU1Gq6mKmYQ31');
      privKey.isValid().should.equal(true);
    });
  });

});
