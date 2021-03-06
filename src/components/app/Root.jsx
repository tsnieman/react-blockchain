import React from 'react';

// Routing
import { BrowserRouter, Match, Miss } from 'react-router';

// Declarative webpack code-splitting using Webpack 2 + System.import
import LazyRoute from 'lazy-route';
import Header from 'components/app/Header';

const Root = () => (
  <BrowserRouter>
    <div>
      <Header />

      <div>
        <Match
          exactly
          pattern="/"
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../pages/Home')}
            />
          )}
        />

        <Match
          exactly
          pattern="/about"
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../pages/About')}
            />
          )}
        />

        <Match
          exactly
          pattern="/hash"
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../pages/Hash')}
            />
          )}
        />

        <Match
          exactly
          pattern="/block"
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../pages/Block')}
            />
          )}
        />

        <Match
          exactly
          pattern="/blockchain"
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../pages/Blockchain')}
            />
          )}
        />

        <Miss
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../pages/HTTP404')}
            />
          )}
        />
      </div>
    </div>
  </BrowserRouter>
);

Root.propTypes = {
};

export default Root;
