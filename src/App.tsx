import React from "react";

import {Switch,Route, RouteComponentProps} from 'react-router-dom'

import Aside from "./component/Aside";
import ContentHeader from "./component/Content.Header";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Apex from "./pages/Apex";
import Home from "./pages/Home";



function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Aside />
      <div className="content-wrapper">
        <ContentHeader />
        <section className="content">
          <div className="container-fluid">
            <Switch>
              <Route path='/' exact render={
                                            (props: RouteComponentProps) => <Home  {...props} /> 
              } />
              <Route path='/apex' exact render={
                                            (props: RouteComponentProps) => <Apex  {...props} /> 
                                            }  />
            </Switch>
          </div>
        </section>
         </div>
      <Footer />
    </div>
  );
}

export default App;
