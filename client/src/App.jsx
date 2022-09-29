import React from 'react';
import "./styles/app.scss"
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route path='/:id'>
                        <Toolbar/>
                        <Canvas/>
                    </Route>
                    <Redirect to={`myBoard${(+new Date).toString(16)}`}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};
export default App;





