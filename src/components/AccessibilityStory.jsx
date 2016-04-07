import React, {Component} from 'react';
import store from '../stores/pollStore.js';
import getAccessibility from '../actions/fetchAccessibilityObject.js'
//import makeParkingStory from '../actions/stories/parking.js'
import createStoriesObject from '../actions/createStoriesObject.js'

export default class AccessibilityStory extends Component {
  constructor(props) {
    super(props)
    this.state = {ppid: 0, stories: null};
  }
  render() {
    var stories = [];
    //for 
    var accordion = (
      <div></div>
    );
    return (
      <div>
        <ul class="accordion" data-accordion>
          <li class="accordion-navigation">
            <a href="#panel1a">Accordion 1</a>
            <div id="panel1a" class="content active">
              Panel 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </li>
          <li class="accordion-navigation">
            <a href="#panel2a">Accordion 2</a>
            <div id="panel2a" class="content">
              Panel 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </li>
          <li class="accordion-navigation">
            <a href="#panel3a">Accordion 3</a>
            <div id="panel3a" class="content">
              Panel 3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </li>
        </ul>
      </div>
    )
  }
  componentDidMount() {
    console.log('this getStoreState: ' + this.getStoreState);
    store.observeChanges(this.getStoreState.bind(this));
  }
  componentWillUnmount() {
    store.unobserveChanges(this.getStoreState.bind(this));
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextState.ppid && parseInt(nextState.ppid) > 0) {
      getAccessibility(nextState.ppid)
      .then(function(accessibilityResponse){
        var stories = createStoriesObject(accessibilityResponse[nextState.ppid]);
        this.setState({stories: stories});
      }.bind(this))
    }
  }
  getStoreState(o) {
    console.log('getStoreState! ' + JSON.stringify(o));
    if (o.ppid !== this.state.ppid) {
      console.log('updating the state from getStoreState');
      this.setState({ppid: o.ppid, stories: null});
    }
  }
  
}
