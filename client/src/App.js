import React, { Component } from 'react';
import Modal from 'react-modal';
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
      arcade_games: [],
      game_id: '',
      game_cost:'',
      game_name: '',
      cust_id: '',
      balance: '',
      money_spent: '',
      modalIsOpen: false,
      modalNewIsOpen: false,
      gameModalIsOpen: false
    }

    this.openModal = this.openModal.bind(this); //Edit entry Modal
    this.closeModal = this.closeModal.bind(this);
    this.openPlayGameModal = this.openPlayGameModal.bind(this); //Play Game? Modal
    this.closePlayGameModal = this.closePlayGameModal.bind(this);

    this.openModalNew = this.openModalNew.bind(this); //Add entry Modal
    this.closeModalNew = this.closeModalNew.bind(this);

    //handle inputs
    this.handleID = this.handleID.bind(this);
    this.handleBalance = this.handleBalance.bind(this)
    this.handleMoneySpent = this.handleMoneySpent.bind(this);

    this.handleAdd = this.handleAdd.bind(this); //handle new data
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this); //handle edit

    this.deleteEntry = this.deleteEntry.bind(this);
    this.stateClear = this.stateClear.bind(this);

    this.handlePlayGame = this.handlePlayGame.bind(this);
    this.handleGameID = this.handleGameID.bind(this);
  }

  handleGameID(e){
    this.setState({
      game_id: e.target.value,
    })
    console.log(e.target.value)
  }

  handlePlayGame(e){
    var data = {
      cust_id: this.state.cust_id,
      game_id: this.state.game_id
    }

    console.log(this.state.balance);
    console.log(this.state.game_cost);

    if (data.game_id === ''){
      alert('Please pick a game');
    }
    else {
      if(this.state.balance <= 0){
        alert('Customer ' + this.state.cust_id + ' has insufficient balance.')
      }

      else {
        fetch("http://localhost:3001/gamesdb/editplaycount", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),


        }).then(function() {
          console.log(data);
          window.location.reload();
        }).catch(function(err) {
          console.log(err)
        })
        alert('Customer ' + this.state.cust_id + ' played game ' + this.state.game_id + '. Balance updated.');
        console.log("Customer has been edited");
      }
    }



    e.preventDefault();

  }


  stateClear(){
    this.setState({
      cust_id: '',
      cust_name: '',
      balance: '',
      money_spent: ''
    });
  }

  openPlayGameModal(e){
    this.setState({
      gameModalIsOpen: true,
      cust_id: e.cust_id,
      balance: e.balance,
      money_spent: e.money_spent,

    })
  }

  closePlayGameModal(){
    this.setState({
      gameModalIsOpen: false
    })
  }


  openModal(customer) {
    this.setState({
      modalIsOpen: true,
      cust_id: customer.cust_id,
      balance: customer.balance,
      money_spent: customer.money_spent
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  openModalNew(){
    this.stateClear();
    this.setState({
      modalNewIsOpen: true,
    });
  }

  closeModalNew(){
    this.setState({
      modalNewIsOpen: false
    });
  }


  //handle new adds
  handleID(e){
    this.setState({
      cust_id: e.target.value
    })
  }

  handleBalance(e){
    this.setState({
      balance: e.target.value
    })
  }

  handleMoneySpent(e){
    this.setState({
      money_spent: e.target.value
    })
  }

  handleAdd(e) {
    var data = {
      cust_id: this.state.cust_id,
      balance: this.state.balance,
      money_spent: this.state.money_spent
    }
    console.log(data);

    fetch("http://localhost:3001/customerdb/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    e.preventDefault();
  }

  //set value edited in state
  handleFormEdit(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e){
    var data = {
      cust_id: this.state.cust_id,
      balance: this.state.balance,
      money_spent: this.state.money_spent
    }
    console.log(data);

    fetch("http://localhost:3001/customerdb/edit", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    console.log("Customer has been edited");
    e.preventDefault();
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

      fetch('/gamesdb')
        .then(res => res.json())
        .then(arcade_games => this.setState({
          arcade_games
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
              <th scope="col">Play Game?</th>
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
                  <td><button onClick={() => this.openPlayGameModal(cust)} type="button" className="btn btn-outline-primary">Play Game?</button></td>
                  <td><button onClick={() => this.openModal(cust)} type="button" className="btn btn-outline-warning">&#9998;</button></td>
                  <td><button onClick={() => this.deleteEntry(cust)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
                </tr>)}
          </tbody>
        </table>
        <button onClick={() => this.openModalNew()} type="button" className="btn btn-outline-primary">Add Customer</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>

          <Modal
            isOpen={this.state.gameModalIsOpen}
            onRequestClose={this.closePlayGameModal}
            contentLabel="Example Modal">
             <h3>Customer {this.state.cust_id} Plays...</h3>
            <form onSubmit={this.handlePlayGame}>
              <select value={this.state.game_id} onChange={this.handleGameID} className="input-group mb-3">
                <option>Select Arcade Game</option>
                {this.state.arcade_games.map(ac =>
                    <option key={ac.game_id} value={ac.game_id}>ID: {ac.game_id} | {ac.game_name} | Cost: {ac.game_cost}</option>
                )}
              </select>
              <br />
               <button type="submit" className="btn btn-outline-primary">Update Entry</button>
           </form>
          </Modal>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal">
             <h3>Edit Customer {this.state.cust_id}</h3>
            <form onSubmit={this.handleEdit} method='POST'>
              <br />
             <label>Balance</label>
               <input
                 type="number"
                 value={this.state.balance}
                 onChange={this.handleBalance}
                 className="form-control"
                 placeholder='Current Arcade Balance'
                />
             <br />
              <label>Money Spent</label>
              <br />
                <input
                  type="number"
                  value={this.state.money_spent}
                  onChange={this.handleMoneySpent}
                  className="form-control"
                  placeholder='0'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Update Entry</button>
           </form>
          </Modal>

          <Modal
            isOpen={this.state.modalNewIsOpen}
            onRequestClose={this.closeModalNew}
            contentLabel="Example Modal">
             <h3>Add Customer</h3>
            <form onSubmit={this.handleAdd} method='POST'>
              <label>Customer ID</label>
                <input
                  type="number"
                  value={this.state.cust_id}
                  onChange={this.handleID}
                  className="form-control"
                  placeholder='6969'
                 />
              <br />
             <label>Balance</label>
               <input
                 type="number"
                 value={this.state.balance}
                 onChange={this.handleBalance}
                 className="form-control"
                 placeholder='Current Arcade Balance'
                />
             <br />
              <label>Money Spent</label>
              <br />
                <input
                  type="number"
                  value={this.state.money_spent}
                  onChange={this.handleMoneySpent}
                  className="form-control"
                  placeholder='0'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Add Entry</button>
           </form>
          </Modal>
        </div>
    );
  }
}


class EmployeeTable extends Component {
  constructor() {
    super();
    this.state = {
      employee: [],
      emp_id: '',
      emp_name: '',
      emp_type: '',
      modalIsOpen: false,
      modalNewIsOpen: false
    }
    this.openModal = this.openModal.bind(this); //Edit entry Modal
    this.closeModal = this.closeModal.bind(this);

    this.openModalNew = this.openModalNew.bind(this); //Add entry Modal
    this.closeModalNew = this.closeModalNew.bind(this);

    //handle inputs
    this.handleID = this.handleID.bind(this);
    this.handleName = this.handleName.bind(this)
    this.handleType = this.handleType.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);

    this.deleteEntry = this.deleteEntry.bind(this);

    this.stateClear = this.stateClear.bind(this);
  }

  stateClear(){
    this.setState({
      emp_id: '',
      emp_name: '',
      emp_type: ''
    });
  }

  //edit modal
  openModal(employee) {
    this.setState({
      modalIsOpen: true,
      emp_id: employee.emp_id,
      emp_name: employee.emp_name,
      emp_type: employee.emp_type
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }


  //add modal
  openModalNew(){
    this.stateClear();
    this.setState({
      modalNewIsOpen: true,
    });
  }

  closeModalNew(){
    this.setState({
      modalNewIsOpen: false
    });
  }


  //handle new adds
  handleID(e){
    this.setState({
      emp_id: e.target.value
    })
  }

  handleName(e){
    this.setState({
      emp_name: e.target.value
    })
  }

  handleType(e){
    this.setState({
      emp_type: e.target.value
    })
  }

  handleAdd(e) {
    var data = {
      emp_id: this.state.emp_id,
      emp_name: this.state.emp_name,
      emp_type: this.state.emp_type
    }
    console.log(data);

    fetch("http://localhost:3001/employeedb/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    e.preventDefault();
  }

  //set value edited in state
  handleFormEdit(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e){
    var data = {
      emp_id: this.state.emp_id,
      emp_name: this.state.emp_name,
      emp_type: this.state.emp_type
    }
    console.log(data);

    fetch("http://localhost:3001/employeedb/edit", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    console.log("Employee has been edited");
    e.preventDefault();
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
                  <td><button onClick={() => this.openModal(emp)} type="button" className="btn btn-outline-warning">&#9998;</button></td>
                  <td><button onClick={() => this.deleteEntry(emp)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
                </tr>)}
          </tbody>
        </table>
        <button onClick={() => this.openModalNew()} type="button" className="btn btn-outline-primary">Add Employee</button>
        <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal">
             <h3>Edit Employee {this.state.emp_id}</h3>
            <form onSubmit={this.handleEdit} method='POST'>
              <br />
             <label>Name</label>
               <input
                 type="text"
                 value={this.state.emp_name}
                 onChange={this.handleName}
                 className="form-control"
                 placeholder='John Doe'
                />
             <br />
              <label>Type</label>
              <br />
                <input
                  type="text"
                  value={this.state.emp_type}
                  onChange={this.handleType}
                  className="form-control"
                  placeholder='Employee Role'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Update Entry</button>
           </form>
          </Modal>

        <Modal
          isOpen={this.state.modalNewIsOpen}
          onRequestClose={this.closeModalNew}
          contentLabel="Example Modal">
           <h3>Add Employee</h3>
          <form onSubmit={this.handleAdd} method='POST'>
            <label>Employee ID</label>
              <input
                type="number"
                value={this.state.emp_id}
                onChange={this.handleID}
                className="form-control"
                placeholder='6969'
               />
            <br />
           <label>Name</label>
             <input
               type="text"
               value={this.state.emp_name}
               onChange={this.handleName}
               className="form-control"
               placeholder='John Doe'
              />
           <br />
            <label>Type</label>
            <br />
              <input
                type="text"
                value={this.state.emp_type}
                onChange={this.handleType}
                className="form-control"
                placeholder='Employee Role'
               />
             <br />
             <button type="submit" className="btn btn-outline-primary">Add Entry</button>
         </form>
        </Modal>
        </div>
    );
  }
}

class ArcadeGameTable extends Component {
  constructor() {
    super();
    this.state = {
      arcade_games: [],
      game_id: '',
      game_name: '',
      game_cost: '',
      play_count: 0,
      modalIsOpen: false,
      modalNewIsOpen: false
    }
    this.handleID = this.handleID.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCost = this.handleCost.bind(this);
    this.handlePlayCount = this.handlePlayCount.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModalNew = this.openModalNew.bind(this);
    this.closeModalNew = this.closeModalNew.bind(this);
    this.stateClear = this.stateClear.bind(this);
  }

  stateClear(){
    this.setState({
      game_id: '',
      game_name: '',
      game_cost: '',
      play_count: 0,
    });
  }

  openModal(ac) {
    this.setState({
      modalIsOpen: true,
      game_name: ac.game_name,
      game_id: ac.game_id,
      game_cost: ac.game_cost,
      play_count: ac.play_count
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  //add modal
  openModalNew(){
    this.stateClear();
    this.setState({
      modalNewIsOpen: true,
    });
  }

  closeModalNew(){
    this.setState({
      modalNewIsOpen: false
    });
  }

  handleID(e){
    this.setState({
      game_id: e.target.value
    })
  }

  handleName(e){
    this.setState({
      game_name: e.target.value
    })
  }

  handleCost(e){
    this.setState({
      game_cost: e.target.value
    })
  }

  handlePlayCount(e){
    this.setState({
      play_count: e.target.value
    })
  }

  handleAdd(e) {
    var data = {
      game_name: this.state.game_name,
      game_id: this.state.game_id,
      game_cost: this.state.game_cost,
      play_count: this.state.play_count
    }
    console.log(data);

    fetch("http://localhost:3001/gamesdb/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    e.preventDefault();
  }

  //set value edited in state
  handleFormEdit(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e){
    var data = {
      game_name: this.state.game_name,
      game_id: this.state.game_id,
      game_cost: this.state.game_cost,
      play_count: this.state.play_count
    }
    console.log(data);

    fetch("http://localhost:3001/gamesdb/edit", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    console.log("Employee has been edited");
    e.preventDefault();
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
                <td><button onClick={() => this.openModal(ac)} type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(ac)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button onClick={() => this.openModalNew()} type="button" className="btn btn-outline-primary">Add Arcade Machine</button>
          <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal">
               <h3>Edit Arcade Machine {this.state.game_id}</h3>
              <form onSubmit={this.handleEdit} method='POST'>
                <br />
               <label>Machine Name</label>
                 <input
                   type="text"
                   value={this.state.game_name}
                   onChange={this.handleName}
                   className="form-control"
                   placeholder='Dance Rush Stardom'
                  />
               <br />
                <label>Cost</label>
                <br />
                  <input
                    type="number"
                    value={this.state.game_cost}
                    onChange={this.handleCost}
                    className="form-control"
                    placeholder='573 credits'
                   />
                 <br />
                 <button type="submit" className="btn btn-outline-primary">Update Entry</button>
             </form>
            </Modal>

          <Modal
            isOpen={this.state.modalNewIsOpen}
            onRequestClose={this.closeModalNew}
            contentLabel="Example Modal">
             <h3>Add Arcade Machine</h3>
            <form onSubmit={this.handleAdd} method='POST'>
              <label>Machine ID</label>
                <input
                  type="number"
                  value={this.state.game_id}
                  onChange={this.handleID}
                  className="form-control"
                  placeholder='6969'
                 />
              <br />
             <label>Machine Name</label>
               <input
                 type="text"
                 value={this.state.game_name}
                 onChange={this.handleName}
                 className="form-control"
                 placeholder='Dance Rush Stardom'
                />
             <br />
              <label>Cost</label>
              <br />
                <input
                  type="number"
                  value={this.state.game_cost}
                  onChange={this.handleCost}
                  className="form-control"
                  placeholder='573 credits'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Add Entry</button>
           </form>
          </Modal>
      </div>
    )
  }
}

class FoodTable extends Component {
  constructor() {
    super();
    this.state = {
      food: [],
      food_name: '',
      food_id: '',
      food_cost: '',
      modalNewIsOpen: false,
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModalNew = this.openModalNew.bind(this);
    this.closeModalNew = this.closeModalNew.bind(this);

    this.handleName = this.handleName.bind(this);
    this.handleID = this.handleID.bind(this);
    this.handleCost = this.handleCost.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.stateClear = this.stateClear.bind(this);
  }

  stateClear(){
    this.setState({
      food_name: '',
      food_id: '',
      food_cost: ''
    });
  }

  //add modal
  openModal(e){
    this.setState({
      modalIsOpen: true,
      food_name: e.food_name,
      food_id: e.food_id,
      food_cost: e.food_cost
    });
  }

  closeModal(){
    this.setState({
      modalIsOpen: false
    });
  }

  //add modal
  openModalNew(){
    this.stateClear();
    this.setState({
      modalNewIsOpen: true,
    });
  }

  closeModalNew(){
    this.setState({
      modalNewIsOpen: false
    });
  }

  handleID(e){
    this.setState({
      food_id: e.target.value
    })
  }

  handleName(e){
    this.setState({
      food_name: e.target.value
    })
  }

  handleCost(e){
    this.setState({
      food_cost: e.target.value
    })
  }


  handleAdd(e) {
    var data = {
      food_name: this.state.food_name,
      food_id: this.state.food_id,
      food_cost: this.state.food_cost
    }
    console.log(data);

    fetch("http://localhost:3001/fooddb/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    e.preventDefault();
  }

  //set value edited in state
  handleFormEdit(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e){
    var data = {
      food_name: this.state.food_name,
      food_id: this.state.food_id,
      food_cost: this.state.food_cost
    }
    console.log(data);

    fetch("http://localhost:3001/fooddb/edit", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    console.log("Employee has been edited");
    e.preventDefault();
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
                <td><button onClick={() => this.openModal(food)} type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(food)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button onClick={() => this.openModalNew()} type="button" className="btn btn-outline-primary">Add Food</button>
          <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal">
               <h3>Edit Food {this.state.food_id}</h3>
              <form onSubmit={this.handleEdit} method='POST'>
                <br />
               <label>Food Name</label>
                 <input
                   type="text"
                   value={this.state.food_name}
                   onChange={this.handleName}
                   className="form-control"
                   placeholder='Chicken Tendies'
                  />
               <br />
                <label>Cost</label>
                <br />
                  <input
                    type="number"
                    value={this.state.food_cost}
                    onChange={this.handleCost}
                    className="form-control"
                    placeholder='Tree Fiddy'
                   />
                 <br />
                 <button type="submit" className="btn btn-outline-primary">Update Entry</button>
             </form>
            </Modal>

          <Modal
            isOpen={this.state.modalNewIsOpen}
            onRequestClose={this.closeModalNew}
            contentLabel="Example Modal">
             <h3>Add Food</h3>
            <form onSubmit={this.handleAdd} method='POST'>
              <label>Food ID</label>
                <input
                  type="number"
                  value={this.state.food_id}
                  onChange={this.handleID}
                  className="form-control"
                  placeholder='6969'
                 />
              <br />
             <label>Food Name</label>
               <input
                 type="text"
                 value={this.state.food_name}
                 onChange={this.handleName}
                 className="form-control"
                 placeholder='Chicken Tendies'
                />
             <br />
              <label>Cost</label>
              <br />
                <input
                  type="number"
                  value={this.state.food_cost}
                  onChange={this.handleCost}
                  className="form-control"
                  placeholder='Tree Fiddy'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Add Entry</button>
           </form>
          </Modal>
      </div>
    )
  }
}

class BeverageTable extends Component {
  constructor() {
    super();
    this.state = {
      beverage: [],
      drink_name: '',
      drink_id: '',
      drink_cost: '',
      modalNewIsOpen: false,
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModalNew = this.openModalNew.bind(this);
    this.closeModalNew = this.closeModalNew.bind(this);

    this.handleName = this.handleName.bind(this);
    this.handleID = this.handleID.bind(this);
    this.handleCost = this.handleCost.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.stateClear = this.stateClear.bind(this);
  }

  stateClear(){
    this.setState({
      drink_name: '',
      drink_id: '',
      drink_cost: ''
    });
  }

  //add modal
  openModal(e){
    this.setState({
      modalIsOpen: true,
      drink_name: e.drink_name,
      drink_id: e.drink_id,
      drink_cost: e.drink_cost
    });
  }

  closeModal(){
    this.setState({
      modalIsOpen: false
    });
  }

  //add modal
  openModalNew(){
    this.stateClear();
    this.setState({
      modalNewIsOpen: true,
    });
  }

  closeModalNew(){
    this.setState({
      modalNewIsOpen: false
    });
  }

  handleID(e){
    this.setState({
      drink_id: e.target.value
    })
  }

  handleName(e){
    this.setState({
      drink_name: e.target.value
    })
  }

  handleCost(e){
    this.setState({
      drink_cost: e.target.value
    })
  }


  handleAdd(e) {
    var data = {
      drink_name: this.state.drink_name,
      drink_id: this.state.drink_id,
      drink_cost: this.state.drink_cost
    }
    console.log(data);

    fetch("http://localhost:3001/beveragedb/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    e.preventDefault();
  }

  //set value edited in state
  handleFormEdit(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e){
    var data = {
      drink_name: this.state.drink_name,
      drink_id: this.state.drink_id,
      drink_cost: this.state.drink_cost
    }
    console.log(data);

    fetch("http://localhost:3001/beveragedb/edit", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    console.log("Beverage has been edited");
    e.preventDefault();
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
                <td><button onClick={() => this.openModal(drink)} type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(drink)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button onClick={() => this.openModalNew()} type="button" className="btn btn-outline-primary">Add Beverage</button>
          <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal">
               <h3>Edit Beverage {this.state.drink_id}</h3>
              <form onSubmit={this.handleEdit} method='POST'>
                <br />
               <label>Drink Name</label>
                 <input
                   type="text"
                   value={this.state.drink_name}
                   onChange={this.handleName}
                   className="form-control"
                   placeholder='Ramune'
                  />
               <br />
                <label>Cost</label>
                <br />
                  <input
                    type="number"
                    value={this.state.drink_cost}
                    onChange={this.handleCost}
                    className="form-control"
                    placeholder='3 credits'
                   />
                 <br />
                 <button type="submit" className="btn btn-outline-primary">Update Entry</button>
             </form>
            </Modal>

          <Modal
            isOpen={this.state.modalNewIsOpen}
            onRequestClose={this.closeModalNew}
            contentLabel="Example Modal">
             <h3>Add Beverage</h3>
            <form onSubmit={this.handleAdd} method='POST'>
              <label>Drink ID</label>
                <input
                  type="number"
                  value={this.state.drink_id}
                  onChange={this.handleID}
                  className="form-control"
                  placeholder='6969'
                 />
              <br />
             <label>Drink Name</label>
               <input
                 type="text"
                 value={this.state.drink_name}
                 onChange={this.handleName}
                 className="form-control"
                 placeholder='Ramune'
                />
             <br />
              <label>Cost</label>
              <br />
                <input
                  type="number"
                  value={this.state.drink_cost}
                  onChange={this.handleCost}
                  className="form-control"
                  placeholder='3 credits'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Add Entry</button>
           </form>
          </Modal>
      </div>
    )
  }
}

class PoolTable extends Component {
  constructor() {
    super();
    this.state = {
      poolTable: [],
      p_table_id: '',
      p_cost: '',
      modalNewIsOpen: false,
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModalNew = this.openModalNew.bind(this);
    this.closeModalNew = this.closeModalNew.bind(this);

    this.handleID = this.handleID.bind(this);
    this.handleCost = this.handleCost.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.stateClear = this.stateClear.bind(this);
  }

  stateClear(){
    this.setState({
      p_table_id: '',
      p_cost: ''
    });
  }

  //edit modal
  openModal(e){
    this.setState({
      modalIsOpen: true,
      p_table_id: e.p_table_id,
      p_cost: e.p_cost
    })
  }

  closeModal(){
    this.setState({
      modalIsOpen: false
    })
  }

  //add modal
  openModalNew(){
    this.stateClear();
    this.setState({
      modalNewIsOpen: true,
    });
  }

  closeModalNew(){
    this.setState({
      modalNewIsOpen: false
    });
  }

  handleID(e){
    this.setState({
      p_table_id: e.target.value
    })
  }

  handleCost(e){
    this.setState({
      p_cost: e.target.value
    })
  }

  handleAdd(e) {
    var data = {
      p_table_id: this.state.p_table_id,
      p_cost: this.state.p_cost
    }
    console.log(data);

    fetch("http://localhost:3001/pooltabledb/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    e.preventDefault();
  }

  //set value edited in state
  handleFormEdit(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e){
    var data = {
      p_table_id: this.state.p_table_id,
      p_cost: this.state.p_cost
    }
    console.log(data);

    fetch("http://localhost:3001/pooltabledb/edit", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    console.log("Pool table has been edited");
    e.preventDefault();
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
                <td><button onClick={() => this.openModal(p_table)} type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(p_table)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button onClick={() => this.openModalNew()} type="button" className="btn btn-outline-primary">Add Pool Table</button>
          <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal">
               <h3>Edit Pool Table {this.state.p_table_id}</h3>
              <form onSubmit={this.handleEdit} method='POST'>
                <br />
                <label>Cost</label>
                <br />
                  <input
                    type="number"
                    value={this.state.p_cost}
                    onChange={this.handleCost}
                    className="form-control"
                    placeholder='3 credits'
                   />
                 <br />
                 <button type="submit" className="btn btn-outline-primary">Update Entry</button>
             </form>
            </Modal>

          <Modal
            isOpen={this.state.modalNewIsOpen}
            onRequestClose={this.closeModalNew}
            contentLabel="Example Modal">
             <h3>Add Pool Table</h3>
            <form onSubmit={this.handleAdd} method='POST'>
              <label>Pool Table ID</label>
                <input
                  type="number"
                  value={this.state.p_table_id}
                  onChange={this.handleID}
                  className="form-control"
                  placeholder='6969'
                 />
              <br />
              <label>Cost</label>
              <br />
                <input
                  type="number"
                  value={this.state.p_cost}
                  onChange={this.handleCost}
                  className="form-control"
                  placeholder='3 credits'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Add Entry</button>
           </form>
          </Modal>
      </div>
    )
  }
}

class GiftShopTable extends Component {
  constructor() {
    super();
    this.state = {
      giftShop: [],
      item_id: '',
      item_name: '',
      item_quantity: '',
      item_cost: '',
      modalNewIsOpen: false,
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModalNew = this.openModalNew.bind(this);
    this.closeModalNew = this.closeModalNew.bind(this);

    this.handleID = this.handleID.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleCost = this.handleCost.bind(this);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.stateClear = this.stateClear.bind(this);
  }

  stateClear(){
    this.setState({
      item_id: '',
      item_name: '',
      item_quantity: '',
      item_cost: '',
    });
  }

  //edit modal
  openModal(e){
    this.setState({
      modalIsOpen: true,
      item_id: e.item_id,
      item_name: e.item_name,
      item_quantity: e.item_quantity,
      item_cost: e.item_cost
    })
  }

  closeModal(){
    this.setState({
      modalIsOpen: false
    })
  }

  //add modal
  openModalNew(){
    this.stateClear();
    this.setState({
      modalNewIsOpen: true,
    });
  }

  closeModalNew(){
    this.setState({
      modalNewIsOpen: false
    });
  }

  handleID(e){
    this.setState({
      item_id: e.target.value
    })
  }

  handleName(e){
    this.setState({
      item_name: e.target.value
    })
  }

  handleQuantity(e){
    this.setState({
      item_quantity: e.target.value
    })
  }

  handleCost(e){
    this.setState({
      item_cost: e.target.value
    })
  }

  handleAdd(e) {
    var data = {
      item_id: this.state.item_id,
      item_name: this.state.item_name,
      item_quantity: this.state.item_quantity,
      item_cost: this.state.item_cost
    }
    console.log(data);

    fetch("http://localhost:3001/giftshopdb/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    e.preventDefault();
  }

  //set value edited in state
  handleFormEdit(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit(e){
    var data = {
      item_id: this.state.item_id,
      item_name: this.state.item_name,
      item_quantity: this.state.item_quantity,
      item_cost: this.state.item_cost
    }
    console.log(data);

    fetch("http://localhost:3001/giftshopdb/edit", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    }).then(function() {
      window.location.reload();
    }).catch(function(err) {
      console.log(err)
    })
    console.log("Gift shop table has been edited");
    e.preventDefault();
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
                <td><button onClick={() => this.openModal(giftShop)} type="button" className="btn btn-outline-warning">&#9998;</button></td>
                <td><button onClick={() => this.deleteEntry(giftShop)} type="button" className="btn btn-outline-danger">&#10005;</button></td>
              </tr>)}
          </tbody>
        </table>
        <button onClick={() => this.openModalNew()} type="button" className="btn btn-outline-primary">Add Gift Shop Item</button>
          <a className="btn btn-outline-secondary" href="#top">Top &#8593;</a>

            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Example Modal">
               <h3>Edit Gift Shop Item {this.state.item_id}</h3>
              <form onSubmit={this.handleEdit} method='POST'>
                <br />
               <label>Item Name</label>
                 <input
                   type="text"
                   value={this.state.item_name}
                   onChange={this.handleName}
                   className="form-control"
                   placeholder='Some Prize That Whales Go For'
                  />
               <br />
                 <label>Quantity</label>
                   <input
                     type="number"
                     value={this.state.item_quantity}
                     onChange={this.handleQuantity}
                     className="form-control"
                     placeholder='100'
                    />
                 <br />
                <label>Cost</label>
                <br />
                  <input
                    type="number"
                    value={this.state.item_cost}
                    onChange={this.handleCost}
                    className="form-control"
                    placeholder='3'
                   />
                 <br />
                 <button type="submit" className="btn btn-outline-primary">Update Entry</button>
             </form>
            </Modal>

          <Modal
            isOpen={this.state.modalNewIsOpen}
            onRequestClose={this.closeModalNew}
            contentLabel="Example Modal">
             <h3>Add Gift Shop Item</h3>
            <form onSubmit={this.handleAdd} method='POST'>
              <label>Item ID</label>
                <input
                  type="number"
                  value={this.state.item_id}
                  onChange={this.handleID}
                  className="form-control"
                  placeholder='6969'
                 />
              <br />
             <label>Item Name</label>
               <input
                 type="text"
                 value={this.state.item_name}
                 onChange={this.handleName}
                 className="form-control"
                 placeholder='Some Prize That Whales Go For'
                />
             <br />
               <label>Quantity</label>
                 <input
                   type="number"
                   value={this.state.item_quantity}
                   onChange={this.handleQuantity}
                   className="form-control"
                   placeholder='100'
                  />
               <br />
              <label>Cost</label>
              <br />
                <input
                  type="number"
                  value={this.state.item_cost}
                  onChange={this.handleCost}
                  className="form-control"
                  placeholder='3'
                 />
               <br />
               <button type="submit" className="btn btn-outline-primary">Add Entry</button>
           </form>
          </Modal>
      </div>
    )
  }
}

export default ArcadeApp;
