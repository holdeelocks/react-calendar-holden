import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      days: {
        "20181117": {
          event1: {
            title: "Study React",
            time: "8:00",
            description: "Learn about state and props"
          },
          event2: {
            title: "Learn Redux",
            time: "9:00",
            description: "Learn about reducers, action creators and more."
          }
        },
        "20190116": {
          event1: {
            title: "Plan a birthday party for Lidiia",
            time: "00:00",
            description: "Keep it a secret. Don't reveal the plan"
          }
        }
      }
    };
  }

  addOrEditEvent = (ev, date, key) => {
    if (!key) key = Date.now();
    // let key = Date.now();

    this.setState(prevState => ({
      days: {
        ...prevState.days,
        [date]: {
          ...prevState.days[date],
          [key]: ev
        }
      }
    }));
  };

  // editEvent = (ev, key, date) => {
  //   this.setState(prevState => ({
  //     days: {
  //       ...prevState.days,
  //       [date]: {
  //         ...prevState.days[date],
  //         [key]: ev
  //       }
  //     }
  //   }));
  // };

  render() {
    return <div className="App">Planner</div>;
  }
}

export default App;
