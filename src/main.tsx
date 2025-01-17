import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import '../i18n';
import ContextProviders from './contexts/ContextProviders';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProviders>
      <App />
    </ContextProviders>
  </StrictMode>
);
