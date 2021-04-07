import React from "react";

import {Switch as Sw,Route, RouteComponentProps} from 'react-router-dom'

import Aside from "./component/Aside";
//import ContentHeader from "./component/Content.Header";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Tutoria from "./pages/Tutoria";
import Apex from "./pages/Apex";
import Blackboard from "./pages/Blackboard";
import Reportes from "./pages/Reportes";



function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Aside />
      <div className="content-wrapper">
        {/*<ContentHeader />*/}
        <section className="content">
          <div className="container-fluid">
            <Sw>
              <Route path='/' exact render={
                                            (props: RouteComponentProps) => <Home  {...props} /> 
              } />

              <Route path='/dashboard/:periodo' exact render={
                                            (props: RouteComponentProps) => <Dashboard {...props} /> 
              } />

              <Route path='/blackboard/:periodo' exact render={
                                                    (props: RouteComponentProps) => <Blackboard  {...props} /> 
                      } />

              {/*****/}
              <Route path='/apex/:periodo' exact render={
                                            (props: RouteComponentProps) => <Apex  {...props} /> 
              } />
              <Route path='/tutoria/:periodo' exact render={
                                            (props: RouteComponentProps) => <Tutoria  {...props} /> 
              } />
              <Route path='/Reportes/:periodo' exact render={
                                            (props: RouteComponentProps) => <Reportes  {...props} /> 
              } />
            </Sw>
          </div>
        </section>
         </div>
      <Footer />
    </div>
  );
}

export default App;
