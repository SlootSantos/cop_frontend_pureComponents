import React, { Component, PureComponent } from 'react';

/***************************HELPER********************/
import compareObjsRef from './helper';

let upperScopeVal = {
  val: 'foo'
};

let updated = 0;

/***************************CHILD********************/
class Child extends PureComponent {
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

  customProps = {
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
    customProps = { ...customProps };

    if (updated < 5) {
      updated++;

      setTimeout(() => {
        this.setState({ test: 'updated' });

        // this.customProps.test++;

        // this.customProps.obj.t = upperScopeVal;
        // upperScopeVal = 'darn! I lost my reference'; // still working :o

        // this.customProps.obj = {
        //   t: upperScopeVal
        // };

        compareObjsRef(customProps, this.customProps, 'CUSTOM PROPS');
      }, 1000);
    }

    return (
      <div className="App">
        <Child {...customProps} />
      </div>
    );
  }
}

export default App;

/*
 * Component will rerender everytime the parent rerender
 * PureComponent will only rerender if any of the props (objects) looses it's reference
 */
