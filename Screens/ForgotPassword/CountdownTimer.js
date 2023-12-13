import React, {Component} from 'react';
import {View, Text} from 'react-native';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {timer: 30};
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(prevState => ({timer: prevState.timer - 1})),
      1000,
    );
  }

  componentDidUpdate() {
    if (this.state.timer === 1) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <Text> {this.state.timer} </Text>;
  }
}

export default CountdownTimer;
