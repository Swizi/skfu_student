import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Main from "./pages/Main/Main";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import { ToastProvider, useToasts } from "react-toast-notifications";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => <Main/>}/>
        <Route path="/Registration" exact render={() => <ToastProvider><Registration /></ToastProvider>}/>
        <Route path="/Login" exact render={() => <ToastProvider><Login /></ToastProvider>}/>
        <Route path="/PersonalAccount" exact render={() => <ToastProvider><PersonalAccount /></ToastProvider>}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
