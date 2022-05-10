import React from "react";
import { Route, Routes as ReactRouters } from "react-router-dom";

import Home from './components/pages/Home'
import Chat from './components/pages/Chat'

const Routes = () => {
    return(
        <ReactRouters>
            <Route element = { <Home/> }  path="/" exact />
            <Route element = { <Chat/> }  path="/chat" />
        </ReactRouters>
    )
 }
 
 export default Routes;