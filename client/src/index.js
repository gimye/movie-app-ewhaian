import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18에서는 createRoot 사용
import './index.css';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Redux Toolkit 사용
import rootReducer from './_reducers'; // 리듀서 이름 변경
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

// configureStore를 사용하여 미들웨어 포함 설정
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(promiseMiddleware, ReduxThunk),
  devTools: process.env.NODE_ENV !== 'production', // 개발 도구 사용 설정
});

// React 18의 createRoot 사용
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// ServiceWorker는 그대로 사용하거나 아예 삭제 가능
// unregister()를 유지하거나 register()로 변경 가능