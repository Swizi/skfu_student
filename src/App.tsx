import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Main from "./pages/Main/Main";
import Registration from "./pages/Registration/Registration";
import { ToastProvider, useToasts } from "react-toast-notifications";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => <Main/>}/>
        <Route path="/Registration" exact render={() => <ToastProvider><Registration /></ToastProvider>}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
