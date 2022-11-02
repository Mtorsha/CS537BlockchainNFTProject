const path = require('path');
const fs = require('fs');
const solc = require('solc');

const ClickStorePath = path.resolve(__dirname, 'contracts', 'ClickStore.sol');
const source = fs.readFileSync(ClickStorePath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'ClickStore.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['ClickStore.sol'].ClickStore;
