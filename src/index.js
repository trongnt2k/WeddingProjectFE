import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Body from './layouts/Body';
import { createStore } from 'redux'
import mainReducer from './reducers/RootReducer'
import { Provider } from 'react-redux';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import CartProvider from './CartProvider/CartProvider';

const store = createStore(mainReducer)

ReactDOM.render(
  <CartProvider>
  <Provider store={store}>
    <Body />
  </Provider>
  </CartProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
