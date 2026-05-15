import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  // react-snap pre-rendered HTML exists — hydrate it
  hydrateRoot(
    rootElement,
    <React.StrictMode><App /></React.StrictMode>
  );
} else {
  // No pre-rendered HTML — render normally (dev mode)
  createRoot(rootElement).render(
    <React.StrictMode><App /></React.StrictMode>
  );
}
