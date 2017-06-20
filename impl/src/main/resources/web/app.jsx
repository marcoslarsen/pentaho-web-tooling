import React from 'react'; 
import {render} from 'react-dom'; 
import e6Module from './es6-module'; 
import artifactsService from './api/artifacts-service';
 
class App extends React.Component { 
  render () { 
    return ( 
      <div> 
        <h1>{this.props.moduleName}!</h1> 
        <h2>{this.props.artifacts}</h2> 
      </div> 
    ); 
  } 
} 

console.log(e6Module);

App.defaultProps = { 
   moduleName: 'e6Module.name',
   artifacts: artifactsService()
} 
 
render( 
  <App/>,  
  document.getElementById('root') 
);