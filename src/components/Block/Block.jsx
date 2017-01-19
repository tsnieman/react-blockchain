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
