import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './store/useThemeStore'; // ensure store initializes and applies theme on load

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => { console.log('Service Worker registrado correctamente'); })
      .catch((error) => { console.error('Error al registrar el Service Worker:', error); });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
