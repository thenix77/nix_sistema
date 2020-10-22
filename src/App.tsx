import React from "react";

import {Switch as Sw,Route, RouteComponentProps} from 'react-router-dom'

import Aside from "./component/Aside";
//import ContentHeader from "./component/Content.Header";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Apex from "./pages/Apex";
import Comandos from "./pages/Comandos";
import Home from "./pages/Home";



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
              <Route path='/apex' exact render={
                                            (props: RouteComponentProps) => <Apex  {...props} /> 
              } />
              <Route path='/comandos' exact render={
                                            (props: RouteComponentProps) => <Comandos  {...props} /> 
                                            }  />
            </Sw>
          </div>
        </section>
         </div>
      <Footer />
    </div>
  );
}

export default App;
