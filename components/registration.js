import { Component } from 'preact'

const EditInput = props => <div className="editInput"><label for={props.name}>{props.name}</label><input name={props.name} value={props.value} onChange={props.onChange} placeholder={props.name}/></div>

const Wifi = props => <div><EditInput name="ssid" value={props.ssid} onChange={props.onChange}></EditInput><EditInput name="password" value={props.password} onChange={props.onChange}></EditInput></div>

const Host = props => <div><EditInput name="host" value={props.host} onChange={props.onChange}></EditInput><EditInput name="port" value={props.port} onChange={props.onChange}></EditInput></div>

export default class Registration extends Component {
    constructor(props) {
        super(props)
        this.setWifi = this.setWifi.bind(this)
        this.classes = 'RegistrationDialog'
        this.state.darken = false
        this.state.wifi = { ssid : '', password : ''}
        this.setSpinner = props.spinner
        this.change = this.change.bind(this)
    }
    setWifi(e) {

        e.preventDefault()
        this.setState({ darken : true })
        this.setSpinner(true)
        console.log(`SSID ${this.state.wifi.ssid} Password ${this.state.wifi.password}`)
    }
    change(e) {
        if(e.target.name === 'ssid') {
            this.setState({ wifi : { ssid : e.target.value, password: this.state.wifi.password}, host :this.state.host, port :this.state.port})
        }
        if(e.target.name === 'password') {
            this.setState({ wifi : { ssid : this.state.wifi.ssid, password: e.target.value}, host :this.state.host, port :this.state.port})
        }
        if(e.target.name === 'host') {
            this.setState({ wifi : { ssid : this.state.wifi.ssid, password: this.state.wifi.password}, host: e.target.value, port : this.state.port})
        }
        if(e.target.name === 'port') {
            this.setState({ wifi : { ssid : this.state.wifi.ssid, password: this.state.wifi.password}, host: this.state.host, port : e.target.value})
        }

        if(this.state.wifi.ssid.length > 8 && this.state.wifi.password.length) {
            console.log('READY...')
        }
        e.preventDefault()
    }
	render() {

        let ready = false
        if(this.state.wifi.ssid.length > 8 && this.state.wifi.password.length > 8) {
            ready = true
        }
		return (
			<div className={this.state.darken ? this.classes + ' darken' : this.classes}>
                <h1>Registration</h1>
                <p>To put the car into registration mode power into ACC mode, when the power button goes to orange.  Press the lock and unlock buttons on the key fob ten times and you will hear a beep.  Which means the car is in registraion mode.  </p>
                <p>Complete the WiFi details below then press register button.  Your device will then attempt to register with the car.</p>
                <Wifi ssid={this.state.wifi.ssid} password={this.state.wifi.password} onChange={this.change}/>
                <button onClick={this.setWifi} disabled={!ready}>Register</button>    
            </div>
		)
	}
}