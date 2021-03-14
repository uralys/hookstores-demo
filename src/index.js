import 'regenerator-runtime/runtime';
import React from 'react';
import {render} from 'react-dom';
import createLaTaverne from 'taverne';
import {Taverne} from 'taverne/hooks';
import {devtools} from 'taverne/middlewares';
import {createGlobalStyle} from 'styled-components';

// -----------------------------------------------------------------------------

import App from './app';
import singleSquare from './features/single-square/store';
import singleRGB from './features/single-rgb/store';
import singlePack from './features/single-pack/store';
import multiPacks from './features/multi-packs/store';

// -----------------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

// -----------------------------------------------------------------------------

const createApp = ({id}) => {
  console.log('👨‍🚀 creating demo using La Taverne');
  const container = document.getElementById(id);

  const {dispatch, store} = createLaTaverne(
    {
      singlePack,
      singleRGB,
      singleSquare,
      multiPacks
    },
    [devtools]
  );

  render(
    <Taverne dispatch={dispatch} store={store}>
      <GlobalStyle />
      <App id={id} />
    </Taverne>,
    container
  );
};

// -----------------------------------------------------------------------------

if (window && !window.createApp) {
  window.createApp = createApp;
}