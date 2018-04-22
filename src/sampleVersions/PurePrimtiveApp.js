import React, { Component, PureComponent } from 'react';

/***************************HELPER********************/
import compareObjsRef from './helper';

let upperScopeVal = {
  val: 'foo'
};

let updated = 0;

/***************************CHILD********************/
class Test extends PureComponent {
  componentDidUpdate() {
    console.log(
      '%c UPDATED CHILD ',
      'background: cyan; color: black;',
      this.props
    );
  }

  render() {
    return <div>hi :)</div>;
  }
}

/***************************PARENT********************/
class App extends Component {
  state = {
    test: 'test'
  };

  customProps = 'primitive';

  customPropsFlat = {
    test: 23
  };

  customPropsDeep = {
    test: 23,
    obj: {
      t: upperScopeVal
    }
  };

  componentDidUpdate() {
    console.log('%c UPDATED PARENT ', 'background: yellow; color: black;');
  }

  render() {
    let { customProps, state } = this;
    if (updated < 5) {
      updated++;

      setTimeout(() => {
        this.setState({ test: 'updated' });
        this.customProps = 'still a primitive';
        compareObjsRef(customProps, this.customProps, 'CUSTOM PROPS');
      }, 1000);
    }

    return (
      <div className="App">
        <Test {...customProps} />
      </div>
    );
  }
}

export default App;

/*
 * Component will rerender everytime the parent rerender
 * PureComponent will only rerender if any of the props (objects) looses it's reference
 */
