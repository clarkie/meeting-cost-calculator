import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

const calculateCost = (state) => {
  const {startTime, endTime, avgSalary, attendeeCount} = state;
  const secondsWorkedInYear = 52*5*8*60*60;
  const costPerSecond = avgSalary * attendeeCount / secondsWorkedInYear;
  const totalSeconds = moment(endTime).diff(startTime, 'seconds');
  return Math.floor(totalSeconds * costPerSecond);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      avgSalary: 30000,
      attendeeCount: 4,
    };
  }

  handleStart() {
    this.setState({
      endTime: null,
      startTime: new Date(),
    });
  }

  handleStop() {
    this.setState({
      endTime: new Date(),
    });
  }

  handleReset() {
    this.setState({
      startTime: null,
      endTime: null,
    });
  }

  handleChange(key, e, value) {
    this.setState({
      [key]: value,
    });
  }

  render(props, state) {
    const {startTime, endTime} = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h2>How much did that meeting cost?</h2>
          </div>
          {startTime ? moment(startTime).format('HH:mm:ss') : null}<br />
          {endTime ? moment(endTime).format('HH:mm:ss') : null}<br />
          £{calculateCost(this.state)}<br />
          <Form {...this.state}
            handleStart={this.handleStart.bind(this)}
            handleStop={this.handleStop.bind(this)}
            handleReset={this.handleReset.bind(this)}
            handleChange={this.handleChange.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

const Form = ({avgSalary, attendeeCount, handleStart, handleStop, handleReset, handleChange}) => (
  <div>
    <TextField hintText="Average Salary" defaultValue={avgSalary} onChange={handleChange.bind(this,'avgSalary')} /><br />
    <TextField hintText="Number of attendees" defaultValue={attendeeCount} onChange={handleChange.bind(this,'attendeeCount')} /><br />
    <RaisedButton label="Start" primary={true} onClick={handleStart}/>
    <RaisedButton label="Stop" secondary={true} onClick={handleStop}/>
    <RaisedButton label="Reset" onClick={handleReset}/>
  </div>
)
