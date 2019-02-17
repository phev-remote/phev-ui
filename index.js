import './style'
import { Component } from 'preact'
import Registration from './components/registration'

const Spinner = props => <div>{props.on ? <svg className='spinner' viewBox='0 0 50 50'><circle className='path' cx='25' cy='25' r='20' fill='none' stroke-width='5'></circle></svg> : null}</div>
				
const configUpdate = config => 
	fetch(API_PREFIX + '/config', {
		method : 'POST',
		headers : {
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify({ carConnection : { ssid : config.wifi.ssid, password : config.wifi.password, host : config.host, port : config.port}})
	}).then(response => response.ok)

export default class App extends Component {
	constructor() {
		super()
		this.state.spinner = false
		this.setSpinner = this.setSpinner.bind(this)
	}
	setSpinner(on) {
		this.setState({ spinner :on })
	}
	render() {
		return (
			<div className="container">
				<Spinner on={this.state.spinner}></Spinner>
				<Registration spinner={this.setSpinner} ></Registration>
			</div>
		)
	}
}
