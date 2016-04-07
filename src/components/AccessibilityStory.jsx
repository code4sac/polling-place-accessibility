import React, {Component} from 'react';
//import pollingPlaceRequests from '../actions/pollingPlaceRequests';
import store from '../stores/pollStore.js';

export default class AccessibilityStory extends Component {
  constructor(props) {
    super(props)
    this.state = {ppid: 0}
  }
  render() {
    return (
      <h1>PPID: {this.state.ppid}</h1>
    )
  }
  componentDidMount() {
    console.log('this getStoreState: ' + this.getStoreState);
    store.observeChanges(this.getStoreState.bind(this));
  }
  componentWillUnmount() {
    store.unobserveChanges(this.getStoreState.bind(this));
  }
  getStoreState(o) {
    console.log('getStoreState! ' + JSON.stringify(o));
    this.setState(o);
  }
}
