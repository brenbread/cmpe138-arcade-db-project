import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; //bootstrap

//Main app, holds the tables from the database
class ArcadeApp extends Component {
  render() {
    return (
      <div className="ArcadeTables">
        <div className="page-header"><h1 id="top">Arcade Management System</h1></div>
        <div className="page-nav-buttons">
          <div className="btn-group" role="group" aria-label="navigation">
            <a className="btn btn-outline-primary" href="#Customers">Customers</a>
            <a className="btn btn-outline-primary" href="#Employees">Employees</a>
            <a className="btn btn-outline-primary" href="#ArcadeGames">Arcade Games</a>
            <a className="btn btn-outline-primary" href="#PoolTable">Pool Tables</a>
            <a className="btn btn-outline-primary" href="#Food">Food</a>
            <a className="btn btn-outline-primary" href="#Drinks">Beverages</a>
            <a className="btn btn-outline-primary" href="#GiftShop">Gift Shop</a>
          </div>
        </div>
        <br />
        <h2 id="Customers">Current Customers</h2>
        <CustomerTable />
        <br />
        <h2 id="Employees">Employees Listing</h2>
        <EmployeeTable />
        <br />
        <h2 id="ArcadeGames">Arcade Game Listing</h2>
        <ArcadeGameTable />
        <br />
        <h2 id="PoolTable">Pool Table Listing</h2>
        <PoolTable />
        <br />
        <h2 id="Food">Food Listing</h2>
        <FoodTable />
        <br />
        <h2 id="Drinks">Beverage Listing</h2>
        <BeverageTable />
        <br />
        <h2 id="GiftShop">Gift Shop Item Listing</h2>
        <GiftShopTable />
        <br />
      </div>
    )
  }
}

//return count of items
class CustomerTable extends Component {
  constructor() {
    super();
    this.state = {
      customer: [],
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(e){
    var data = {
      id: e.cust_id
    }
    fetch("http://localhost:3001/customerdb", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
        console.log(err)
    });
}

  componentDidMount() {
    fetch('/customerdb')
      .then(res => res.json())
      .then(customer => this.setState({
        customer
      }));
  }

  render() {
    return (
      <div className = "CustomerTable">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Customer ID</th>
              <th scope="col">Balance</th>
              <th scope="col">Money Spent</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
              {this.state.customer.map(cust =>
                <tr key={cust.cust_id}>
                  <td>{cust.cust_id}</td>
                  <td>{cust.balance}</td>
                  <td>{cust.money_spent}</td>
                  <td><button type="button" className="btn btn-outline-warning">&#9998;</button></td>
                    <td><button onClick={() => this.deleteEntry(cust)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
                </tr>)}
          </tbody>
        </table>
        <button type="button" className="btn btn-outline-primary">Add Customer</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>
        </div>
    );
  }
}
class EmployeeTable extends Component {
  constructor() {
    super();
    this.state = {
      employee: []
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(e){
    var data = {
      id: e.emp_id
    }
    fetch("http://localhost:3001/employeedb", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
        console.log(err)
    });
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
      <div className = "Table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Job</th>
              <th scope="col">Update</th>
              <th scope="col">Fire</th>
            </tr>
          </thead>
          <tbody>
              {this.state.employee.map(emp =>
                <tr key={emp.emp_id}>
                  <td>{emp.emp_id}</td>
                  <td>{emp.emp_name}</td>
                  <td>{emp.emp_type}</td>
                  <td><button type="button" className="btn btn-outline-warning">&#9998;</button></td>
                  <td><button onClick={() => this.deleteEntry(emp)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
                </tr>)}
          </tbody>
        </table>
      <button type="button" className="btn btn-outline-primary">Add Employee</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>
        </div>
    );
  }
}

class ArcadeGameTable extends Component {
  constructor() {
    super();
    this.state = {
      arcade_games: [],
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(e){
    var data = {
      id: e.game_id
    }
    fetch("http://localhost:3001/gamesdb", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
        console.log(err)
    });
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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Game</th>
              <th scope="col">Cost</th>
              <th scope="col">Play Count</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arcade_games.map(ac =>
              <tr key={ac.game_id}>
                <td>{ac.game_id}</td>
                <td>{ac.game_name}</td>
                <td>{ac.game_cost}</td>
                <td>{ac.play_count}</td>
                <td><button type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(ac)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button type="button" className="btn btn-outline-primary">Add Arcade Machine</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>
      </div>
    )
  }
}

class FoodTable extends Component {
  constructor() {
    super();
    this.state = {
      food: [],
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(e){
    var data = {
      id: e.food_id
    }
    fetch("http://localhost:3001/fooddb", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
        console.log(err)
    });
}

  componentDidMount(){
    fetch('/fooddb')
      .then(res => res.json())
      .then(food => this.setState({
        food
      }))
  }

  render() {
    return(
      <div className="FoodTable">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Food Name</th>
              <th scope="col">Cost</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.food.map(food =>
              <tr key={food.food_id}>
                <td>{food.food_id}</td>
                <td>{food.food_name}</td>
                <td>{food.food_cost}</td>
                <td><button type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(food)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button type="button" className="btn btn-outline-primary">Add Food Item</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>
      </div>
    )
  }
}

class BeverageTable extends Component {
  constructor() {
    super();
    this.state = {
      beverage: [],
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(e){
    var data = {
      id: e.drink_id
    }
    fetch("http://localhost:3001/beveragedb", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
        console.log(err)
    });
}

  componentDidMount(){
    fetch('/beveragedb')
      .then(res => res.json())
      .then(beverage => this.setState({
        beverage
      }))
  }

  render() {
    return(
      <div className="BeverageTable">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Beverage Name</th>
              <th scope="col">Cost</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.beverage.map(drink =>
              <tr key={drink.drink_id}>
                <td>{drink.drink_id}</td>
                <td>{drink.drink_name}</td>
                <td>{drink.drink_cost}</td>
                <td><button type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(drink)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button type="button" className="btn btn-outline-primary">Add Drink</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>
      </div>
    )
  }
}

class PoolTable extends Component {
  constructor() {
    super();
    this.state = {
      poolTable: [],
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(e){
    var data = {
      id: e.p_table_id,
    }
    fetch('http://localhost:3001/pooltabledb', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
        console.log(err)
    });
}

  componentDidMount(){
    fetch('/pooltabledb')
      .then(res => res.json())
      .then(poolTable=> this.setState({
        poolTable
      }))
  }

  render() {
    return(
      <div className="PoolTable">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Cost</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.poolTable.map(p_table =>
              <tr key={p_table.p_table_id}>
                <td>{p_table.p_table_id}</td>
                <td>{p_table.p_cost}</td>
                <td><button type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(p_table)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button type="button" className="btn btn-outline-primary">Add Pool Table</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>
      </div>
    )
  }
}

class GiftShopTable extends Component {
  constructor() {
    super();
    this.state = {
      giftShop: [],
    }
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  deleteEntry(e){
    var data = {
      id: e.item_id
    }
    fetch("http://localhost:3001/giftshopdb", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
        console.log(err)
    });
}

  componentDidMount(){
    fetch('/giftshopdb')
      .then(res => res.json())
      .then(giftShop=> this.setState({
        giftShop
      }))
  }

  render() {
    return(
      <div className="GiftShopTable">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.giftShop.map(giftShop =>
              <tr key={giftShop.item_id}>
                <td>{giftShop.item_id}</td>
                <td>{giftShop.item_name}</td>
                <td>{giftShop.item_quantity}</td>
                <td>{giftShop.item_cost}</td>
                <td><button type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(giftShop)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button type="button" className="btn btn-outline-primary">Add Gift Shop Item</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>
      </div>
    )
  }
}

export default ArcadeApp;
