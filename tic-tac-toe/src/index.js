import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter as Router} from 'react-router-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import './index.css';
import App from './App';
import Game from './Tic';
import NavBar from './nav';
import Errorpage from './Error'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <HashRouter>
        <div>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Game" component={Game} />
                <Redirect from='/Redirect' to="/"/>
                <Route component={Errorpage} />
            </Switch>
        </div>
    </HashRouter>,
    document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
