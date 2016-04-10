import React, { Component } from 'react';
import PollingPlaceForm from './PollingPlaceForm'
import Place from './PlaceForm'
import _ from 'lodash'

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTab: 'map'
		}
	}

	getStyles() {
		return {
			root: {
				height: '100%',
				fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
			},
			header: {
				width: '100%',
				height: 300,
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				textTransform: 'uppercase',
				fontWeight: 300,
				fontSize: 80,
				textShadow: '2px 2px #333',
				color: 'white',
				backgroundImage: `url(${require('./../assets/images/sacCapitol.jpg')})`,
				backgroundSize: '100% 100%',
    			backgroundRepeat: 'no-repeat',
			},
			tabs: {
				width: '100%',
				height: 50,
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			},
			tab: (tab) => {
				return {
					cursor: 'pointer',
					background: tab === this.state.currentTab ? 'green' : 'white',
					display: 'flex',
					flexGrow: 1,
					justifyContent: 'space-around',
					height: '100%',
					alignItems: 'center',
				}
			},
			currentTab: {
				height: 'calc( 100vh - 300px - 50px)'
			}
		}
	}

	render() {

		const tabs = ['map', 'form']
		const styles = this.getStyles()

		let renderedTab = (tab) => {
			if (tab === 'map') {
				return <Place />
			} else if (tab === 'form') {
				return <PollingPlaceForm />
			}
		}

		return (
			<div style={styles.root}>
				<div style={styles.header}>
					Poll Locations
				</div>
				<div style={styles.tabs}>
					{_.map(tabs, tab => {
						return <div key={tab} style={styles.tab(tab)} onClick={()=>this.setState({currentTab: tab})}>
							<span>{_.capitalize(tab)}</span>
						</div>
					})}
				</div>
				<div style={styles.currentTab}>
					{ renderedTab(this.state.currentTab) }
				</div>
	  		</div>
		);
	}
}
