import { Router } from '@reach/router';
import { StrictMode } from 'react';
import { render } from 'react-dom';

import './App.css'

import { ComponentLoader } from '../components/ComponentLoader';

declare global {
  interface Window {
    apiBaseUrl: string;
  }
}
window.apiBaseUrl ??= '';

export function Site() {

  return (
    <ComponentLoader isLoading={false}>
      <h1 className='test'>
        TEST
          </h1>
      {/* <Router basepath={''} primary={false}>
        <h1 className='test'>
          TEST
          </h1>
      </Router> */}
    </ComponentLoader>
  );
}
export function init() {
  // set urls and default token

}
export function strictRender() {
  init();
  // render the app in the #root dom
  render(
    <StrictMode>
      <Site />
    </StrictMode>,
    document.getElementById('root')
  );
}