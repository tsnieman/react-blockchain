import React from 'react';
import './Block.css';

import SHA256 from 'js-sha256';
import Link from 'react-router/Link';

import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

const isValid = function isValid(hash) {
  return hash.substr(0, 3) === '000';
};

const DEFAULT_BLOCK_DATA = {
  blockId: 1,
  miscData: 'Hello, world!',
  nonce: 123,
};

const addState = withState('theState', 'setTheState', {
  blockHash: SHA256(JSON.stringify(DEFAULT_BLOCK_DATA)),
  blockData: DEFAULT_BLOCK_DATA,
});

const addHandlers = withHandlers({
  mineBlock: ({ setTheState, theState: { blockData } }) => (inputData) => {
    let isValidHash = false;

    for (let testNonce = 0; !isValidHash && testNonce < 20000; testNonce++) {
      const testBlockData = {
        ...blockData,
        nonce: testNonce,
      };

      const testHash = SHA256(JSON.stringify(testBlockData))

      isValidHash = isValid(testHash)
      if (isValidHash) {
        setTheState({
          blockHash: testHash,
          blockData: {
            ...blockData,
            nonce: testNonce,
          }
        });
      }
    }
  },

  setBlockData: ({ setTheState }) => (blockData) => {
    setTheState({ blockData });

    setTheState({ blockData, blockHash: SHA256(JSON.stringify(blockData)) });
  },
});

const Block = addState(addHandlers(({
  setBlockData,
  mineBlock,

  theState: {
    blockHash,
    blockData,
  }
}) => (
  <div styleName="wrapper">
    <p>
      In Bitcoin, transactions are recorded in a public ledger. This ledger uses a technology called a <strong>blockchain</strong>. The blockchain is made up of many <strong>blocks</strong>. Blocks are agreed upon, validated bundles of data -- in Bitcoin's case, the blocks contain transaction data. Before thinking too much about what a <em>blockchain</em> is, let's dissect a singular <em>block</em>.
    </p>

    <h2>Block</h2>

    <p>
      Blocks generally have rules like these:
    </p>

    <ul>
      <li>A block is comprised of <span styleName="color-block-data">block data</span>. This is stuff like like block number, misc user data, etc.</li>
      <li>For a block to be considered "valid", the <Link to="/hash">hash</Link> of the block data must begin with a particular sequence of characters. For example: the hash must begin with <code>000</code> (three zeros).</li>
      <li>Since the hash of any data entirely random and unique depending on the input data, blocks (in blockchains) use add an extra bit of data called a "nonce". The nonce is, simply, a random number. This number, since it changes the data of the block (because it's added to the data <em>before</em> producing the hash from that data), changes the hash. Since the hash changes, we can use this to find a block which (when including the nonce) has a hash that meets the rules to be considered "valid". i.e. Using the "hash begins with <code>000</code> (three zeros) rule, a block of data which includes the nonce 123 might produce a hash which begins with 92f, making it an invalid block. That same block, but with nonce 7925 instead of 123 might produce a hash which begins with 000, making it a valid block! The only difference between the two blocks is the nonce, which is used to randomize the hash to find a block which has a "valid" hash. (the <em>why</em> of this whole "finding a valid block" process is going to be focused in the <Link to="/blockchain">blockchain</Link> lesson)</li>
      <li>Since manually changing the nonce to find a valid block would be tedious, there's an automated process called <strong>mining</strong> which tries random numbers as the nonce until it finds a valid nonce.</li>
    </ul>

    <p>To explore this, let's try an interactive block.</p>

    <p>Interactive block:</p>

    <p>For this example, a Block is considered "valid" when the <code>hash</code> of the Block's data (including a nonce) begins with <code>000</code> (three zeros). Click the "Mine block" to find a nonce which makes the block with the given data valid.</p>

    <div styleName={`block ${isValid(blockHash) ? 'valid' : 'invalid' }`}>
      <p styleName="validity">BLOCK IS <strong>{isValid(blockHash) ? 'VALID' : 'INVALID'}</strong></p>

      <div styleName="form-group">
        <label>
          <span styleName="label-text color-block-data">Block #:</span>
          <input
            type="text"
            onChange={(event) => setBlockData({
              ...blockData,
              blockId: event.target.value,
            })}
            defaultValue={DEFAULT_BLOCK_DATA.blockId}
          />
        </label>
      </div>

      <div styleName="form-group">
        <label>
          <span styleName="label-text color-block-data">Misc data:</span>
          <small>Any data you might have.</small>
          <textarea
            onChange={(event) => setBlockData({
              ...blockData,
              miscData: event.target.value,
            })}
            defaultValue={DEFAULT_BLOCK_DATA.miscData}
          />
        </label>
      </div>

      <div styleName="form-group">
        {console.log({ blockData })}
        <label>
          <span styleName="label-text color-block-data">Nonce:</span>
          <small>A "nonce" is just a random number with which to make the block valid.</small>
          <input
            type="text"
            onChange={(event) => setBlockData({
              ...blockData,
              nonce: event.target.value,
            })}
            disabled
            value={blockData.nonce}
          />
        </label>
      </div>
    </div>

    <div styleName="hash">
      <span styleName="label-text">SHA-256 hash of <span styleName="color-block-data">block data</span>:</span>
      <input
        type="text"
        disabled
        value={blockHash}
      />
    </div>

    <br />

    <button onClick={mineBlock} style={{ fontSize: '2em' }}>Mine block</button>
  </div>
)));

Block.propTypes = {
};

export default Block;
