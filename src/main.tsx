import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux"
import store from './state/store.ts';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}> 
        <App />
        <Toaster position='bottom-center'/>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
