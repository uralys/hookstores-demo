import 'regenerator-runtime/runtime';
import React from 'react';
import {render} from 'react-dom';
import App from './app';
import {DispatcherProvider} from './lib/hookstores/dispatcher-context';
import {StoresProvider} from './lib/hookstores/stores-context';

// -----------------------------------------------------------------------------

const createApp = (options = {}) => {
  console.log('👨‍🚀 creating App', options);
  const id = options.container;

  if (!id) {
    console.error('[App] Requires a container.');
  }

  const container = document.getElementById(id);
  render(
    <DispatcherProvider>
      <StoresProvider>
        <App id={id} />
      </StoresProvider>
    </DispatcherProvider>,
    container
  );
};

// -----------------------------------------------------------------------------

if (window && !window.createApp) {
  window.createApp = createApp;
}

export default createApp;
