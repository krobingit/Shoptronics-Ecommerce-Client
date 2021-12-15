import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';
import { Provider } from 'react-redux';
import Loader from "react-loader-spinner";
ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={<Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
