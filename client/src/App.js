import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import io from "socket.io-client";
import Device from './components/Device';

const Auth = new AuthService();

class App extends React.Component {

  state = {
    graphData: {},
    deviceStatus: []
  }

  constructor(props) {
    super(props);
    //Connection
    this.deviceList = [];
    this.initialData = [];

    this.ready = false;

    // this.socket = io("http://localhost:5000", {
    //   "transports": ["websocket"]
    // });

    this.socket = io();
    
    this.socket.on('get_device_list', (data) => {
      this.deviceList = data

      console.log("Device List")
      console.log(data)

      this.socket.emit('get_initial_data');
    });
    
    this.socket.on('get_initial_data', (data) => {
      this.setUpGraphData(data);

      console.log("Initial Data")
      console.log(data)

      this.socket.emit('get_latest_device_status');
    });

    this.socket.on('get_latest_device_status', (data) => {
      let temp = this.state.graphData
      console.log(data)
      console.log(temp)

      data.forEach((dataRow) => {
        temp[dataRow['deviceid']]['currentStatusAndTime'] = { status: dataRow['status'], time: dataRow['latest_time_entry'] }
      });
      

      console.log("From listener of get_latest_devicew_status")
      console.log(temp)
      this.setState({graphData: temp})
    });

    this.socket.on("new_monitor_data", (data) => {
      console.log(data)

      if(!this.ready) return;
      
      const deviceId = data['deviceId']
      const newTime = Date.parse(data['time'])

      let temp = this.state.graphData
      temp[deviceId]['records'].push(data)

      let mostRecentRecordedStatusAndTime = temp[deviceId]['currentStatusAndTime']
      
      const lastEntryTime = Date.parse(mostRecentRecordedStatusAndTime['time'])

      console.log(mostRecentRecordedStatusAndTime)
      console.log(lastEntryTime)

      if(newTime >= lastEntryTime) {
        console.log("Change Detected")
        mostRecentRecordedStatusAndTime = data
      }

      temp[deviceId]['currentStatusAndTime'] = mostRecentRecordedStatusAndTime;

      console.log("From new_monitor_data")
      console.log(temp)
      this.setState({ graphData: temp })
    });

    this.socket.on('connect', (data) => {
      
      this.socket
        .on('authenticated', async () => {
          console.log("Authenticated");
          setTimeout(() => {
            this.initiateProcess();
            this.ready = true;
          }, 600);
        })
        .emit('authenticate', {token: Auth.getToken()}); //send the jwt
    });
  }

  setUpGraphData(initialData) {
    let graphData = {
      
    }
    this.deviceList.forEach((device) => {
      graphData[device['deviceid']] = {}
      graphData[device['deviceid']]['records'] = []
      graphData[device['deviceid']]['currentStatusAndTime'] = {}
      console.log(graphData)
    });

    initialData.forEach((data) => {
      graphData[data['deviceid']]['records'].push(data)
    });

    console.log("setUpGraphData called")
    this.setState({ graphData })
  }

  componentDidMount() {
    //this.initiateProcess();
  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }

  initiateProcess() {
    this.socket.emit('get_device_list');
    console.log(this.state.graphData)
  }

  render() {
    
    return(
      <div>
        <div className="App-header">
          Load Monitor
        </div>
        <div className="App">
          { this.devices() }
         
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button><br />
          <br />
        </div>
        
      </div>
    );
  }

  devices() {
    return this.deviceList.map((device) => {
      return Device(device, this.state.graphData);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }


}

export default withAuth(App);