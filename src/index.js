import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Category from './Category';
import ReadInfo from './ReadInfo';
import Book from './Book';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css';
import './config';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    // 开启浏览器调试
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/category/:type' component={Category}></Route>
                    <Route path='/readinfo/:id' component={ReadInfo}></Route>
                    <Route path='/book/:id' component={Book}></Route>
                    <Route path='/' component={App}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
