import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Global error handler for deployment debugging
window.addEventListener('error', (event) => {
  // Ignore specific errors that are non-critical or expected in certain environments
  if (event.message.includes('Script error')) return;
  
  const errorBox = document.createElement('div');
  errorBox.style.position = 'fixed';
  errorBox.style.top = '0';
  errorBox.style.left = '0';
  errorBox.style.width = '100%';
  errorBox.style.padding = '20px';
  errorBox.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
  errorBox.style.color = 'white';
  errorBox.style.zIndex = '99999';
  errorBox.style.fontFamily = 'monospace';
  errorBox.style.whiteSpace = 'pre-wrap';
  errorBox.textContent = `Runtime Error: ${event.message}\n${event.filename}:${event.lineno}`;
  document.body.appendChild(errorBox);
  
  // Auto-remove after 5 seconds if it's likely transient
  setTimeout(() => {
    if (document.body.contains(errorBox)) {
      document.body.removeChild(errorBox);
    }
  }, 5000);
});

window.addEventListener('unhandledrejection', (event) => {
  // Filter out "Failed to fetch" errors which are common with blocked CDNs or CSP issues in Discord/Iframes
  if (event.reason && (
      event.reason.toString().includes('Failed to fetch') || 
      event.reason.toString().includes('NetworkError') ||
      event.reason.toString().includes('Importing a module script failed')
  )) {
    console.warn("Suppressed UI Error Banner for network issue:", event.reason);
    return;
  }

  const errorBox = document.createElement('div');
  errorBox.style.position = 'fixed';
  errorBox.style.top = '100px';
  errorBox.style.left = '0';
  errorBox.style.width = '100%';
  errorBox.style.padding = '20px';
  errorBox.style.backgroundColor = 'rgba(150, 0, 0, 0.9)';
  errorBox.style.color = 'white';
  errorBox.style.zIndex = '99999';
  errorBox.style.fontFamily = 'monospace';
  errorBox.textContent = `Unhandled Promise Rejection: ${event.reason}`;
  document.body.appendChild(errorBox);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(errorBox)) {
      document.body.removeChild(errorBox);
    }
  }, 5000);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);