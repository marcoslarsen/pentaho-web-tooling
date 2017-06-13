import * as styles from 'styles.scss'
import React from 'react'; 
import {render} from 'react-dom'; 
import amdModule from './amd-module'; 
import artifactsService from './artifacts-service';
 
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
   artifacts: artifactsService()
} 
 
render( 
  <App/>,  
  document.getElementById('root') 
);