import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <UserForm />
        <Hierarchy />

      </div>
    );
  }
}

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: props.manager,
      name: props.name,
      members: props.members,
    };
  }

  formatMembersList = () => {
    let stringMembers = '';
    for (let i=0; i<this.state.members.length; i++) {
      stringMembers = stringMembers.concat(this.state.members[i]);
      stringMembers = stringMembers.concat(' ');
      if (i < this.state.members.length -1) { stringMembers = stringMembers.concat('|'); }
      stringMembers = stringMembers.concat(' ');
    }

    return stringMembers;
  }

  render() {
    return (
      <div className="team-manager pt-4 pr-4 pl-4 pb-4 mb-4 text-left">
        <p>{this.state.manager}</p>
        <div className="team">
          <p className="pl-1 mt-1 mb-1"><b>{this.state.name}:</b> {this.formatMembersList()}</p>
        </div>
      </div>
    );
  }
}


class Hierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };
    this.loadData();
  }

  renderTeam(manager, name, members) {
    return (
      <div key={name}>
        <Team manager={manager} name={name} members={members} />
      </div>
    )
  }

  loadData = () => {
    // WARNING please use the chrome extension -> allow-control-allow-origi to allow this request
    // https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
    // WARNING

    axios.get('http://localhost:3000/teams.json')
      .then(response => this.setState({ teams: response.data.teams }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        {this.state.teams.map(team => this.renderTeam(team.manager, team.name, team.members))}
      </div>
    );
  }
}

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      teamId: '',
      teams: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadData();
  }

  loadData = () => {
    axios.get('http://localhost:3000/teams.json')
      .then(response => this.setState({ teams: response.data.teams }))
      .catch(error => console.log(error))
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState({[name]: value});
  }



  handleSubmit(event) {
    alert('Form was submitted with: ' + this.state.fullName + ' and ' + this.state.teamId);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container mb-4">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <input name="fullName" className="form-control" type="text" placeholder="User full name"
              value={this.state.fullName}  onChange={this.handleChange} />
            </div>
            <div className="col">
              <select name="teamId" className="custom-select" value={this.state.teamId} onChange={this.handleChange}>
                <option selected>Select team</option>
                {this.state.teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
              </select>
            </div>
            <div className="float-right">
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default App;
