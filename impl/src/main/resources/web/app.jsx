import * as styles from 'styles.scss';
import React from 'react';
import {render} from 'react-dom';
import amdModule from './amd-module';

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>{this.props.name}!</h1>
      </div>
    );
  }
}

App.defaultProps = {
   name: amdModule.name
}

render(
  <App/>, 
  document.getElementById('root')
);
