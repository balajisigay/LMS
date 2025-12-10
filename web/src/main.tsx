import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes';   // ← USE ROUTES, NOT App.tsx

console.log('========== main.tsx loaded ==========');
console.log('React version:', React.version);

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement ? 'YES' : 'NO', rootElement);

if (!rootElement) {
  console.error('❌ CRITICAL: Root element (#root) not found in DOM');
  document.body.innerHTML = '<h1 style="color: red; padding: 20px; font-family: Arial;">ERROR: Root element not found</h1>';
} else {
  try {
    console.log('✓ Creating React root...');
    const root = ReactDOM.createRoot(rootElement);

    console.log('✓ Rendering AppRoutes...');
    root.render(
      <React.StrictMode>
        <AppRoutes />   {/* ← THIS FIXES THE BLANK SCREEN */}
      </React.StrictMode>,
    );

    console.log('✓ App successfully rendered to DOM');
    console.log('========== React app is LIVE ==========');
  } catch (error) {
    console.error('❌ Error during React rendering:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    rootElement.innerHTML = `<h1 style="color: red; padding: 20px; font-family: Arial;">ERROR: ${errorMsg}</h1>`;
  }
}

