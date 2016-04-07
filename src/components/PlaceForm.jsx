import React, {Component} from 'react';
import _ from 'lodash'
import $ from 'jquery'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as placeRequests from '../actions/placeRequests';

export default class PollingPlaceForm extends Component {
  constructor(props) {
    // Junar API key: 365e06cd12a419135ae87d9f0ec0a8e60b25fbe3#sthash.qxY4OVZH
    // Google API key: AIzaSyDRoMwLIG_AcxMeha5PIv9lWnM0AwWRsCM
    // Fusion Table key: 1Wps1_Vj4dkNiAIozL47QINAYAhonMgfVf0F3aPyR
    // https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201Wps1_Vj4dkNiAIozL47QINAYAhonMgfVf0F3aPyR&key=AIzaSyDRoMwLIG_AcxMeha5PIv9lWnM0AwWRsCM
    super(props);
  }

  componentDidMount() {
    /* this organizes all of the places into an object:
     * { ppid, address }
     *
     */
    // placeRequests.getPollingPlaces()
  
    let zip = placeRequests.getZipCode('3333 Rosemont Dr Sacramento', (err, res) => {
      return res
    })
  
  }

  getZipCode() {

  }

  render() {
    return (
      <div>Hey dude</div>
    )
  }
};
