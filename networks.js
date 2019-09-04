'use strict';

var Put = require('bufferput');
var buffertools = require('buffertools');
var hex = function(hex) {
  return new Buffer(hex, 'hex');
};
var hexReverse = function(hex) {
  return buffertools.reverse(new Buffer(hex, 'hex'));
};

exports.livenet = {
  name: 'livenet',
  magic: hex('bf0c6bbd'),
  addressVersion: 0x4c,
  privKeyVersion: 212,
  P2SHVersion: 16,
  hkeyPublicVersion: 0x02fe52f8,
  hkeyPrivateVersion: 0x02fe52cc,
  genesisBlock: {
    hash: hexReverse('00000096738eb7b1ab0b72a7e490251760ed3b1e7352a380d01adcf1a4ea09a3'),
    merkle_root: hexReverse('3fd7e9a011dbc959c557f69405b21d39c4e3b48551037171a8a2013f5a60f637'),
    height: 0,
    nonce: 668743,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1567025721,
    bits: 0x1e0ffff0,
  },
  dnsSeeds: [
    
  ],
  defaultClientPort: 32456
};

exports.mainnet = exports.livenet;

exports.testnet = {
  name: 'testnet',
  magic: hex('cee2caff'),
  addressVersion: 0x8c,
  privKeyVersion: 239,
  P2SHVersion: 19,
  hkeyPublicVersion: 0x3a8061a0,
  hkeyPrivateVersion: 0x3a805837,
  genesisBlock: {
    hash: hexReverse('00000bafbc94add76cb75e2ec92894837288a481e5c005f6563d91623bf8bc2c'),
    merkle_root: hexReverse('3fd7e9a011dbc959c557f69405b21d39c4e3b48551037171a8a2013f5a60f637'),
    height: 0,
    nonce: 3861367235,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1390666206,
    bits: 504365040,
  },
  dnsSeeds: [
    
  ],
  defaultClientPort: 32458
};
