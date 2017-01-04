import React from 'react';
import './Hash.css';

import SHA256 from 'js-sha256';

import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

const DEFAULT_INPUT_DATA = 'Hello, world!';

const addState = withState('theState', 'setTheState', {
  resultingHash: SHA256(DEFAULT_INPUT_DATA),
});

const addHandlers = withHandlers({
  hashInputData: ({ setTheState }) => (inputData) => {
    setTheState({ resultingHash: SHA256(inputData) });
  },
});

const Hash = addState(addHandlers(({
  hashInputData,

  theState: {
    resultingHash,
  }
}) => (
  <div styleName="wrapper">
    Before discussing *what* a hash is, let's create a scenario for it to help it feel more approachable and applicable.

    <h2>Scenario</h2>

    <p>Imagine you live in a country which is becoming heavily authoritarian and has begun heavily spying on its citizens. The government is going so far as to intercept its citizens' downloads, replacing the intended file with a duplicate which also includes a small bit of spying malware added on. How could you verify that a piece of software you download isn't tainted with such malware? Let's talk about one way to verify and mitigate these kinds of "man-in-the-middle" attacks: hash functions.</p>

    <h2>Hash functions</h2>

    <p>Given ANY data -- i.e. a text file, a movie, binary, etc -- it is possible to create a short, unique identifier with which to verify the content against. Think of it akin to a "fingerprint", unique to the given data (and ONLY the given data; if you changed the data, the "fingerprint" would change). In our case, this "fingerprint" is called a hash.</p>

    <p>Hashes are generated via a programming interface called a "function". Functions take data in and do something with it. In this case, the hash functions take data in and return the hash.</p>

    <p>To give you an idea of what a hash looks like, here's what the data <code>Hello, world!</code> looks like when produced by a SHA-256 hash function:</p>

    <div styleName="card">
      <div>
        <label>
          <span styleName="label-text">Input data:</span>
          <textarea
            onChange={(event) => hashInputData(event.target.value)}
            defaultValue={DEFAULT_INPUT_DATA}
            disabled
          />
        </label>
      </div>

      <div>
        <span styleName="label-text">SHA-256 hash of input data:</span>
        <input
          type="text"
          disabled
          value={SHA256(DEFAULT_INPUT_DATA)}
        />
      </div>
    </div>

    <h2>Interactive SHA-256 hash generator:</h2>

    <div styleName="card">
      <div>
        <label>
          <span styleName="label-text">Input data:</span>
          <textarea
            onChange={(event) => hashInputData(event.target.value)}
            defaultValue={DEFAULT_INPUT_DATA}
          />
        </label>
      </div>

      <div>
        <span styleName="label-text">SHA-256 hash of input data:</span>
        <input
          type="text"
          disabled
          value={resultingHash}
        />
      </div>
    </div>

  </div>
)));

Hash.propTypes = {
};

export default Hash;
