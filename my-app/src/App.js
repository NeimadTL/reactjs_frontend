import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

        <Hierarchy />
      </div>
    );
  }
}

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.value,
    };
  }

  render() {
    return (
      <div className="team">
        {this.state.name}
      </div>
    );
  }
}

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: props.value,
    };
  }

  getMembersListAsString = () => {
    if(this.state.members.length === 1) { return  this.state.members[0]; }

    let stringMembers = '';
    for (let i=0; i<this.state.members.length; i++) {
      stringMembers = stringMembers.concat(this.state.members[i]);
      stringMembers = stringMembers.concat(' ');
      stringMembers = stringMembers.concat('|');
      stringMembers = stringMembers.concat(' ');
    }

    return stringMembers;
  }

  render() {
    return (
      <div className="team-members"><p>{this.getMembersListAsString()}</p></div>
    );
  }
}

class Hierarchy extends React.Component {
  renderTeam(name, members) {
    return (
      <div>
        <Team value={name} />
        <TeamMembers value={members} />
      </div>
    )
  }

  render() {
    return (
       <div>
         <div className="">
           {this.renderTeam('Product', ['Brian Setiba'])}
           {this.renderTeam('R&D', ['Gregory Shell', 'Patrick Makenzie', 'Mathieu Denim'])}
         </div>
       </div>
    );
  }
}


export default App;
