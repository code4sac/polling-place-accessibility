import React, {Component} from 'react';
import store from '../stores/pollStore.js';
import getAccessibility from '../actions/fetchAccessibilityObject.js'
import createStoriesObject from '../actions/createStoriesObject.js'

export default class AccessibilityStory extends Component {
  constructor(props) {
    super(props)
    this.state = {ppid: 0, stories: null};
  }
  render() {
    var stories = [];
    var accordionCounter = 0;
    for (var section in this.state.stories) {
      accordionCounter++;
      let id = `panel${accordionCounter}a`;
      let href = '#' + id;
      stories.push(
        <li className="accordion-navigation">
          <a href="{href}">{section}</a>
          <div id="{id}" className="content active">
            {this.state.stories[section].summary}
          </div>
        </li>
      )
    }
    return (
      <div>
        <ul className="accordion" data-accordion>
          {stories}
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
    if (nextState.ppid && parseInt(nextState.ppid) > 0 && nextState.ppid !== this.state.ppid) {
      getAccessibility(nextState.ppid)
      .then((accessibilityResponse) => {
        var stories = createStoriesObject(accessibilityResponse[nextState.ppid]);
        this.setState({stories});
      })
    }
  }
  getStoreState(o) {
    if (o.ppid !== this.state.ppid) {
      this.setState({ppid: o.ppid, stories: null});
    }
  }
  
}
