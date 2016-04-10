import React, { Component } from 'react';
import PollingPlaceForm from './PollingPlaceForm'
import Place from './PlaceForm'
import _ from 'lodash'

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTab: 'form'
		}
	}

	getStyles() {
		return {
			root: {
				height: '100%'
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
				fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
				backgroundImage: `url(${require('./../assets/images/sacCapitol.jpg')})`,
				backgroundSize: '100% 100%',
    			backgroundRepeat: 'no-repeat',
			},
			tabs: {
				width: '100%',
				maxHeight: 50,
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			},
			tab: (tab) => {
				return {
					cursor: 'pointer',
					background: tab === this.state.currentTab ? 'blue' : 'green',
					display: 'flex',
					flexGrow: 1,
					justifyContent: 'space-around',
					height: '100%',
					alignItems: 'center',
				}
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
				<div>
					{ renderedTab(this.state.currentTab) }
				</div>
	  		</div>
		);
	}
}
