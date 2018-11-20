import React, { Component } from "react";
import moment from "./momentRange";
import Day from "./components/Days";
import styled from "styled-components";

//ONLY FOR DEBUGGING
const CalendarWrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    width: 100%;
    margin-bottom: 1%;
  }
  .button-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  button {
    height: 25px;
    background-color: lightblue;
    opacity: 0.5;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

window.moment = moment;

class App extends Component {
  state = {
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
    },
    currentMonth: "201811"
  };

  nextMonth = () => {
    this.setState(prevState => ({
      currentMonth: moment(prevState.currentMonth, "YYYYMM")
        .add(1, "months")
        .format("YYYYMM")
    }));
  };

  prevMonth = () => {
    this.setState(prevState => ({
      currentMonth: moment(prevState.currentMonth, "YYYYMM")
        .subtract(1, "months")
        .format("YYYYMM")
    }));
  };

  addOrEditEvent = (ev, date, key) => {
    if (!key) key = Date.now();

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

  deleteEvent = (date, key) => {
    let dates = { ...this.state.days[date] };
    delete dates[key];

    this.setState(prevState => ({
      days: {
        ...prevState.days,
        [date]: dates
      }
    }));
  };

  render() {
    let dates = Array.from(
      moment(this.state.currentMonth, "YYYYMM")
        .range("month")
        .by("days")
    );
    return (
      <CalendarWrapper>
        <h1>
          {moment(this.state.currentMonth, "YYYYMM").format("MMMM, YYYY")}
        </h1>
        <div className="button-container">
          <button onClick={this.prevMonth}>&larr;</button>
          <button onClick={this.nextMonth}>&rarr;</button>
        </div>

        {dates.map(date => (
          <Day
            date={date}
            key={date.format("YYYYMMDD")}
            events={this.state.days[date.format("YYYYMMDD")]}
          />
        ))}
      </CalendarWrapper>
    );
  }
}

export default App;
