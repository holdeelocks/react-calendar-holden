import React, { Component } from "react";
import moment from "./momentRange";
import Day from "./components/Days";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
    opacity: 0.8;
    height: 100px;
    h1 {
      font-size: 2rem;
      margin: 0;
      color: white;
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
    currentMonth: "201811",
    showModal: false,
    curentDate: "",
    title: "",
    time: "",
    description: ""
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

  addOrEditEvent = () => {
    let key = Date.now();

    this.setState(prevState => ({
      days: {
        ...prevState.days,
        [this.state.currentDate]: {
          ...prevState.days[this.state.currentDate],
          [key]: {
            title: this.state.title,
            time: this.state.time,
            description: this.state.description
          }
        }
      },
      showModal: !this.state.showModal
    }));
  };

  toggle = e => {
    console.log(e.target.dataset.date);
    this.setState({
      showModal: !this.state.showModal,
      currentDate: e.target.dataset.date
    });
  };

  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
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
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    console.log(this.state.currentDate);

    return (
      <CalendarWrapper>
        <GlobalStyle />
        <div>
          <Button color="danger" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button>
          <Modal
            isOpen={this.state.showModal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle} close={closeBtn}>
              Add Or Edit An Event
            </ModalHeader>
            <ModalBody>
              <form onSubmit={this.addOrEditEvent}>
                <label name="title">
                  Event Title:
                  <input
                    type="text"
                    name="title"
                    placeholder="event name here..."
                    onChange={this.handleChange}
                    value={this.state.title}
                  />
                </label>
                <label name="time">
                  Time:
                  <input
                    type="text"
                    name="time"
                    placeholder="time of event here..."
                    onChange={this.handleChange}
                    value={this.state.time}
                  />
                </label>
                <label name="description">
                  Description:
                  <input
                    type="text"
                    name="description"
                    placeholder="event description here.."
                    onChange={this.handleChange}
                    value={this.state.description}
                  />
                </label>
                <Button color="primary" onClick={this.addOrEditEvent} />
              </form>
            </ModalBody>
          </Modal>
        </div>

        <div className="header-container">
          <button onClick={this.prevMonth}>&larr;</button>
          <h1>
            {moment(this.state.currentMonth, "YYYYMM").format("MMMM, YYYY")}
          </h1>
          <button onClick={this.nextMonth}>&rarr;</button>
        </div>

        <div className="calendar-container">
          {dates.map(date => (
            <Day
              date={date}
              key={date.format("YYYYMMDD")}
              events={this.state.days[date.format("YYYYMMDD")]}
              click={this.toggle}
            />
          ))}
        </div>
      </CalendarWrapper>
    );
  }
}

export default App;
