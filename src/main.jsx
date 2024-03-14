import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthWrapper } from './store/storeWrapper.jsx';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <BrowserRouter>
        <AuthWrapper>
            <App />
            <Analytics />
        </AuthWrapper>
    </BrowserRouter>
    // </React.StrictMode>
);
