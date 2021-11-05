import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AllContextProviders } from './Contexts';

render(
  <React.StrictMode>
    <AllContextProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AllContextProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
