import React, { Component } from "react";
import moment from "./momentRange";
import Calendar from "./components/Calendar";

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .header-container {
    width: 100%;
    padding: 0 2%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    background-color: #3f5f7f;
    opacity: 0.75;
    z-index: 2;
    height: 100px;
    top: 0;
    h1 {
      font-size: 2rem;
      margin: 0;
      color: white;
      text-shadow: -3px -3px black;
    }
    button {
      height: 25px;
      background-color: lightblue;
      cursor: pointer;
      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
  .calendar-container {
    padding-top: 120px;
    width: 90%;
    margin: 0 auto;
  }
`;

//ONLY FOR DEBUGGING
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

  addOrEditEvent = (e, date, key) => {
    if (!key) key = Date.now();

    this.setState(prevState => ({
      days: {
        ...prevState.days,
        [date]: {
          ...prevState.days[date],
          [key]: e
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
    // let dates = Array.from(
    //   moment(this.state.currentMonth, "YYYYMM")
    //     .range("month")
    //     .by("days")
    // );

    return (
      <CalendarWrapper>
        <GlobalStyle />

        <div className="header-container">
          <button onClick={this.prevMonth}>&larr;</button>
          <h1>
            {moment(this.state.currentMonth, "YYYYMM").format("MMMM YYYY")}
          </h1>
          <button onClick={this.nextMonth}>&rarr;</button>
        </div>

        <div className="calendar-container">
          <Calendar
            month={this.state.currentMonth}
            days={this.state.days}
            addOrEditEvent={this.addOrEditEvent}
            deleteEvent={this.deleteEvent}
            nextMonth={this.nextMonth}
            prevMonth={this.prevMonth}
          />
        </div>
      </CalendarWrapper>
    );
  }
}

export default App;
