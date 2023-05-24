import React from "react";
import { Route, Routes as ReactRouters } from "react-router-dom";

import Home from './components/pages/Home'

const Routes = () => {
    return(
        <ReactRouters>
            <Route element = { <Home/> }  path="/" exact />
        </ReactRouters>
    )
 }
 
 export default Routes;