import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const calculateCost = (state) => {
  const {startTime, endTime, avgSalary, attendeeCount} = state;
  const secondsWorkedInYear = 52*5*8*60*60;
  const costPerSecond = avgSalary * attendeeCount / secondsWorkedInYear;
  const totalSeconds = moment(endTime).diff(startTime, 'seconds');
  const totalCost = Math.floor(totalSeconds * costPerSecond);
  if(isNaN(totalCost)) {
    return 0;
  }
  return totalCost;
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

  setStartTime(event, date) {
    this.setState({
      startTime: date
    });
  }

  setEndTime(event, date) {
    this.setState({
      endTime: date
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
          <Form
            avgSalary={this.state.avgSalary}
            attendeeCount={this.state.attendeeCount}
            handleStart={this.handleStart.bind(this)}
            handleStop={this.handleStop.bind(this)}
            handleReset={this.handleReset.bind(this)}
            handleChange={this.handleChange.bind(this)}
            setStartTime={this.setStartTime.bind(this)}
            setEndTime={this.setEndTime.bind(this)}
          />
          <br /><br /><br /><br /><br /><br /><br /><br />
          <h1>Total Cost = £{calculateCost(this.state)}</h1>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

const Form = ({avgSalary, attendeeCount, handleStart, handleStop, handleReset, handleChange, setStartTime, setEndTime}) => (
  <div>
    <TextField floatingLabelText="Average Salary" defaultValue={avgSalary} onChange={handleChange.bind(this,'avgSalary')} /><br />
    <TextField floatingLabelText="Number of attendees" defaultValue={attendeeCount} onChange={handleChange.bind(this,'attendeeCount')} /><br />
    <RaisedButton label="Start" primary={true} onClick={handleStart}/>
    <RaisedButton label="Stop" secondary={true} onClick={handleStop}/>
    <RaisedButton label="Reset" onClick={handleReset}/>
    <br /><br /><br />
    <TimePicker format="24hr" hintText="Enter Start Time" onChange={setStartTime}/>
    <TimePicker format="24hr" hintText="Enter End Time" onChange={setEndTime}/>
    <br />
    <RaisedButton label="Submit" primary={true} onClick={handleReset}/>
    <RaisedButton label="Reset" onClick={handleReset}/>
  </div>
)
