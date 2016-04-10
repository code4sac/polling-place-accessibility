import React, {Component} from 'react';
import _ from 'lodash'
import $ from 'jquery'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as placeRequests from '../actions/placeRequests';
import locationsData from './../datasets/locations.js'

export default class PollingPlaceForm extends Component {
  constructor(props) {
    // Junar API key: 365e06cd12a419135ae87d9f0ec0a8e60b25fbe3#sthash.qxY4OVZH
    // Google API key: AIzaSyDRoMwLIG_AcxMeha5PIv9lWnM0AwWRsCM
    // Fusion Table key: 1Wps1_Vj4dkNiAIozL47QINAYAhonMgfVf0F3aPyR
    // https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20*%20FROM%201Wps1_Vj4dkNiAIozL47QINAYAhonMgfVf0F3aPyR&key=AIzaSyDRoMwLIG_AcxMeha5PIv9lWnM0AwWRsCM
    super(props)

    let places = []
    _(locationsData).chunk(5).map((location) => {
      const ppid = location[0][0]
      const address = `${location[1][0]} ${location[2][0]}`
      const latLng = [_.toNumber(location[3][0]), _.toNumber(location[4][0])]
      const placeObj = {ppid, address, latLng}
      places.push(placeObj)
    }).value()
    this.state = {places}
  }

  getStyles() {
    return {
      root: {
        height: '100%',
        width: '100%'
      }
    }
  }

  render() {
    const styles = this.getStyles()
    const center = [38.6064550353, -121.385014929];
    return (
      <div style={styles.root}>
        <span> Hi </span>
        <Map center={center} zoom={13}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {_.map(this.state.places, (location) => {
            return (<Marker key={location.ppid} position={location.latLng}>
              <Popup>
                <span>{location.ppid}<br/>{location.address}</span>
              </Popup>
            </Marker>)
          })}
        </Map>
      </div>
    )
  }
};
