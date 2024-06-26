import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContainer from './AppContainer';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/ReduxStore';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <React.StrictMode> */}
        <AppContainer />
      {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
