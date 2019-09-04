'use strict';

var chai = chai || require('chai');
var bitcore = bitcore || require('../bitcore');

var should = chai.should();

var WalletKeyModule = bitcore.WalletKey;
var networks = bitcore.networks;
var WalletKey;

describe('WalletKey', function() {
  it('should initialze the main object', function() {
    should.exist(WalletKeyModule);
  });
  it('should be able to create class', function() {
    WalletKey = WalletKeyModule;
    should.exist(WalletKey);
  });
  it('should be able to create instance', function() {
    var s = new WalletKey();
    should.exist(s);
  });
  it('should be able to call generate', function() {
    var s = new WalletKey();
    s.generate.bind(s).should.not.throw(Error);
  });
  it('should be able to call storeObj', function() {
    var s = new WalletKey();
    s.generate();
    var o = s.storeObj();
    should.exist(o);
  });
  it('roundtrip for storeObj/fromObj', function() {
    var s = new WalletKey();
    s.generate();
    var obj = s.storeObj();
    var s2 = new WalletKey();
    s2.fromObj(obj);
    s.privKey.private.toString().should.equal(s2.privKey.private.toString());
    s.privKey.public.toString().should.equal(s2.privKey.public.toString());
  });

  it('should import  priv key testnet / compressed', function() {
    var priv = 'cU5NxfpfecLCUWnJyoUF6dCZqCfLSAZnTBPraCPis2if8iHHbNk1';
    var s = new WalletKey({
      network: networks.testnet
    });
    s.fromObj({ priv: priv});
    s.privKey.compressed.should.equal(true);
    var o = s.storeObj();
    o.priv.should.equal(priv);
    o.pub.should.equal('03fd4788dd045c791043d739dd10d5e8b15aa6c9702f26116dde88ebbce6eb7706');
    o.addr.should.equal('mqBsTsnVF2zifoGtm7UsXRfdJUr52Jg5d4');
  });


  it('should import priv key livenet / uncompressed', function() {

    //this is a WIF priv, compress flag = false
    var priv = '7rtGvW68UH6rRwsqDxFWX1aw4fneHWs2m2PcKFUU1Gq6mKmYQ31';
    var s = new WalletKey();
    s.fromObj({ priv: priv});
    s.privKey.compressed.should.equal(false);
    var o = s.storeObj();
    o.priv.should.equal(priv);
    o.pub.should.equal('04a8f9140254392ba7478878383f684cebb10306706c294d80095d6cf6a6dc958e9e31ffdb6d6ced33f836867554bdf797eda35f2e51ac345d719a4723690f5726');
    o.addr.should.equal('Xj8zJnj7xxXstimrGWgkDN9SDuAoviM9Gu');
  });


  it('should import priv key livenet / compressed', function() {

    //this is a WIF priv, compress flag = true
    var priv = 'XHBKH9PdyQ4qB7DMrAs3HTamdCCTZtopmK8nsYtECCsJSZxWttYP';
    var s = new WalletKey();
    s.fromObj({ priv: priv});
    s.privKey.compressed.should.equal(true);
    var o = s.storeObj();
    o.priv.should.equal(priv);
    o.pub.should.equal('02a8f9140254392ba7478878383f684cebb10306706c294d80095d6cf6a6dc958e');
    o.addr.should.equal('Xbg5dKWmzE2tp9rGbvFpwu1jN4yjvcwRWd');
  });



});
