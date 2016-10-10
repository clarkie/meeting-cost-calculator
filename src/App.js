import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      avgSalary: 30000,
      attendeeCount: 4,
      isRunning: false,
    };
  }

  handleStart() {
    console.log('handleStart');
    this.setState({
      endTime: null,
      startTime: new Date(),
    });
  }

  handleStop() {
    console.log('handleStop');
    this.setState({
      endTime: new Date(),
    });
  }

  handleReset() {
    console.log('handleReset');
    this.setState({
      startTime: null,
      endTime: null,
    });
  }

  render(props, state) {
    console.log(props, this.state);
    const {startTime, endTime} = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h2>How much did that meeting cost?</h2>
          </div>
          {startTime ? moment(startTime).format('HH:mm:ss') : null}
          {endTime ? moment(endTime).format('HH:mm:ss') : null}
          <Form {...this.state}
            handleStart={this.handleStart.bind(this)}
            handleStop={this.handleStop.bind(this)}
            handleReset={this.handleReset.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

const Form = ({avgSalary, attendeeCount, handleStart, handleStop, handleReset}) => (
  <div>
    <TextField hintText="Average Salary" defaultValue={avgSalary} /><br />
    <TextField hintText="Number of attendees" defaultValue={attendeeCount} /><br />
    <RaisedButton label="Start" primary={true} onClick={handleStart}/>
    <RaisedButton label="Stop" secondary={true} onClick={handleStop}/>
    <RaisedButton label="Reset" onClick={handleReset}/>
  </div>
)
