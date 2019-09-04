'use strict';

var chai = chai || require('chai');
var bitcore = bitcore || require('../bitcore');

var should = chai.should();

var Electrum = bitcore.Electrum;
var Address = bitcore.Address;
var mpk = '92eea4d2f5263651db9e3222caded1fd4c89772f79a7c03fb6afc00e9d2c9d2ed9b86c2c95fc1171e49163079dacb7f048b3c509a27a490e1df9e7128362d468';

/**
 * The hard coded values (expected public key / address hash) were retrieved
 * by creating an Electrum wallet and looking which addresses were generated for
 * master public key mpk. Not very rigorous but it will help catch regressions.
 */
describe('Electrum', function() {
  it('should initialze the main object', function() {
    should.exist(Electrum);
  });
  it('should be able to create instance', function() {
    var elec = new Electrum(mpk);
    should.exist(elec);
  });
  it('should be able to call generatePubKey', function() {
    var elec = new Electrum(mpk);
    (function () {
      elec.generatePubKey(0);
    }).should.not.throw(Error);
  });
  it('should be able to call generateChangePubKey', function() {
    var elec = new Electrum(mpk);
    (function () {
      elec.generateChangePubKey(0);
    }).should.not.throw(Error);
  });
  it('should generate correct public key at sequence 0', function() {
    var elec = new Electrum(mpk);
    var pubkey = elec.generatePubKey(0);
    var addr = Address.fromPubKey(pubkey);
    addr.as('base58').should.equal('XfAgwb8xfGUWQUzsc4KFXYTRcfUz1ngDVp');
  });
  /*
  * NOTE: This should be revalidated because there is no Electrum wallet
  * for Darkcoin at the moment.
  */
  it('should generate correct (change) public keys at sequence 0,1,2', function() {
    var expected_values = {
      receiving: [
        'XfAgwb8xfGUWQUzsc4KFXYTRcfUz1ngDVp',
        'XiztxcMsV2HRMdrnLCJP9V23Zvz7ew4ArR',
        'XpMenkRKThmFAWc66EEFgtc25AUiv37B6r'
      ],
      change: [
        'Xcp57E7MwEUVzSnRzBwLhJ5PcztAGv68ne',
        'Xbxx7pMnjpnxyQa2PsBYPFfkJgZHPPVheJ',
        'Xu35JxRfg9rKg6GTn1tR2FEaKuN9aHzkq1'
      ]
    };
    var elec = new Electrum(mpk);

    var pubkey, addr, addr_change;

    for (var i = 0; i < expected_values.receiving.length; i++) {
      //receiving
      pubkey = elec.generatePubKey(i);
      addr = Address.fromPubKey(pubkey);
      addr.as('base58').should.equal(expected_values.receiving[i]);

      //change
      pubkey = elec.generateChangePubKey(i);
      addr = Address.fromPubKey(pubkey);
      addr.as('base58').should.equal(expected_values.change[i]);
    }
  });
});
