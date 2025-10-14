import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate
      loading={<div>Restoring your session...</div>}
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
)
