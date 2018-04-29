import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //bootstrap

class ArcadeApp extends Component {
  render() {
    return (
      <div className="App">
        <h1>Employee List</h1>
        <EmployeeTable />
        <br />
        <h1>Game List</h1>
        <ArcadeGameTable />
      </div>
    )
  }
}

class EmployeeTable extends Component {
  state = {
    employee: [],
  }

  componentDidMount() {
      fetch('/employeedb')
        .then(res => res.json())
        .then(employee => this.setState({
          employee
        }));
  }

  render() {
    return (
      <div className = "UserTable">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Job</th>
              <th />
            </tr>
          </thead>
          <tbody>
              {this.state.employee.map(emp =>
                <tr key={emp.emp_id}>
                  <td>{emp.emp_id}</td>
                  <td>{emp.emp_name}</td>
                  <td>{emp.emp_type}</td>
                  <td><button type="button" class="btn btn-outline-danger">X</button></td>
                </tr>)}
          </tbody>
        </table>
        <button type="button" class="btn btn-outline-primary">Add User</button>
        </div>
    );
  }
}

class ArcadeGameTable extends Component {
  state = {
    arcade_games: []
  }

  componentDidMount(){
    fetch('/gamesdb')
      .then(res => res.json())
      .then(arcade_games => this.setState({
        arcade_games
      }))
  }

  render() {
    return(
      <div className="ArcadeGameTable">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Game</th>
              <th scope="col">Cost</th>
              <th scope="col">Play Count</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.arcade_games.map(ac =>
              <tr key={ac.game_id}>
                <td>{ac.game_id}</td>
                <td>{ac.game_name}</td>
                <td>{ac.game_cost}</td>
                <td>{ac.play_count}</td>
                <td><button type="button" class="btn btn-outline-danger">X</button></td>
              </tr>)}
          </tbody>
        </table>
        <button type="button" class="btn btn-outline-primary">Add Arcade Machine</button>
      </div>
    )
  }
}



export default ArcadeApp;
