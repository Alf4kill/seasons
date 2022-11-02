import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

class App extends React.Component {
  constructor(props) {
    super(props);
    // only moment that is ok to use a direct assignment
    this.state = { lat: null, erroMessage: "" };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ erroMessage: err.message })

      // not ok to use => this.state.lat = position.coords.latitude
    );
  }

  render() {
    if (this.state.erroMessage && !this.state.lat) {
      return <div>Error: {this.state.erroMessage}</div>;
    }
    if (!this.state.erroMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
