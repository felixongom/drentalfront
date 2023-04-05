import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Toaster} from 'react-hot-toast'
import { StateContext } from './assets/js/Context';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { ClientContext } from './assets/js/ClientContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClientContext>
    <StateContext>
    <BrowserRouter>
    <Toaster/>
      <App />
    </BrowserRouter>
  </StateContext>
</ClientContext>
);

reportWebVitals();
