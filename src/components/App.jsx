import React, { Component } from 'react';
import PollingPlaceForm from './PollingPlaceForm'
import AccessibilityStory from './AccessibilityStory'

export class App extends Component {

  render() {
    return (
    	<div>
	      <PollingPlaceForm />
        <AccessibilityStory />
      </div>
    );
  }
}
