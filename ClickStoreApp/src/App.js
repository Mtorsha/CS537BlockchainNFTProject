import React from "react";
import web3 from "./web3";
import ClickStore from "./ClickStore";

class App extends React.Component {
  state = {
    manager: "",
  };


  async componentDidMount() {
    const manager = await ClickStore.methods.manager().call();

  }



  render() {
      return (
        <div>
          <h2>Click Store</h2>
        )
    }
}
export default App;
