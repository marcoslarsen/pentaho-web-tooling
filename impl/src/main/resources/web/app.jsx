import React from 'react'; 
import {render} from 'react-dom'; 
import amdModule from './amd-module'; 
import artifacts from './artifacts';
 
class App extends React.Component { 
  render () { 
    return ( 
      <div> 
        <h1>{this.props.name}!</h1> 
        <h2>{this.props.artifacts}</h2> 
      </div> 
    ); 
  } 
} 

App.defaultProps = { 
   name: amdModule.name,
   artifacts: artifacts()
} 
 
render( 
  <App/>,  
  document.getElementById('root') 
);