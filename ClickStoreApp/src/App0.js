import React from "react";
import web3 from "./web3";
import TwoWinnersLottery from "./TwoWinnersLottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
    keyword: ""
  };
  async componentDidMount() {
    const manager = await TwoWinnersLottery.methods.manager().call();
    const players = await TwoWinnersLottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(TwoWinnersLottery.options.address);
    console.log(TwoWinnersLottery.options.address);
    this.setState({ manager, players, balance });
    console.log('manager',this.state.manager);
    console.log('balance',this.state.balance);
    console.log('b4 submit',this.state.keyword,this.state.value);
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });
    console.log(this.state.message);
    console.log(accounts[0]);
    console.log(this.state.keyword,this.state.value);
    await TwoWinnersLottery.methods.enter(this.state.keyword).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "You have been entered!" });
    console.log(this.state.message);
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await TwoWinnersLottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              name="value"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
            <div>
            <label>Your keyword</label>
            <input
              name="keyword"
              value={this.state.keyword}
              onChange={(event) => this.setState({ keyword: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;
