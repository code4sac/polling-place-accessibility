import React, { Component } from 'react';
import PollingPlaceForm from './PollingPlaceForm'
import Place from './PlaceForm'

export class App extends Component {

  render() {
    return (
    	<div>
	      <PollingPlaceForm />
	      <Place />
      </div>
    );
  }
}
