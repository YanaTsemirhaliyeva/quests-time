import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { checkAuthAction, fetchQuestsAction } from './store/api-actions';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

store.dispatch(fetchQuestsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <ToastContainer theme='dark' />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
