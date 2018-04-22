import React, { Component, PureComponent } from 'react';

/***************************HELPER********************/
import compareObjsRef from './helper';

let upperScopeVal = {
  val: 'foo'
};

let updated = 0;

/***************************CHILD********************/
class Test extends Component {
  componentDidUpdate() {
    console.log(
      '%c UPDATED CHILD ',
      'background: cyan; color: black;',
      this.props
    );
  }

  render() {
    return <div>COP Front End for the win!</div>;
  }
}

/***************************PARENT********************/
class App extends Component {
  state = {
    test: 'test'
  };

  componentDidUpdate() {
    console.log('%c UPDATED PARENT ', 'background: yellow; color: black;');
  }

  render() {
    let { customProps, state } = this;
    compareObjsRef(state, this.state, 'states');

    if (updated < 5) {
      updated++;

      setTimeout(() => {
        this.setState({ test: 'updated' });
      }, 1000);
    }

    return (
      <div className="App">
        <Test customProp={'always the same!'} />
      </div>
    );
  }
}

export default App;

/*
 * Component will rerender everytime the parent rerenders
 */
