import React from 'react';
import PropTypes from 'prop-types';

class Keydown extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeypress = this.handleKeypress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeypress);
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeypress);
  }
  handleKeypress(event) {
    const { key } = event;
    const { keycodes } = this.props;

    let targetKey = key;
    if (event.ctrlKey) {
      targetKey = `ctrl+${key}`;
    }
    if (keycodes.has(targetKey)) {
      this.props.handler();
    }
  }
  render() {
    return this.props.children;
  }
}

Keydown.propTypes = {
  keycodes: PropTypes.any,
  children: PropTypes.any,
  handler: PropTypes.func,
};

export default Keydown;
