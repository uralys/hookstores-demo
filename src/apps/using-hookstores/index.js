import 'regenerator-runtime/runtime';
import React from 'react';
import {render} from 'react-dom';
import {Hookstores} from 'hookstores';

// -----------------------------------------------------------------------------

import App from './app';
import singleSquareStore from './features/single-square/store-description';
import singleRGBStore from './features/single-rgb/store-description';
import singleLineStore from './features/single-line/store-description';

// -----------------------------------------------------------------------------

const descriptions = {singleLineStore, singleRGBStore, singleSquareStore};

// -----------------------------------------------------------------------------

const createApp = ({id}) => {
  console.log('👨‍🚀 creating demo using Hookstores');
  const container = document.getElementById(id);

  render(
    <Hookstores descriptions={descriptions}>
      <App id={id} />
    </Hookstores>,
    container
  );
};

// -----------------------------------------------------------------------------

if (window && !window.createApp) {
  window.createApp = createApp;
}

export default createApp;
