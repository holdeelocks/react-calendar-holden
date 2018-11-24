import React from "react";
import Event from "./Event";
import Modal from "./Modal";
import Form from "./Form";
import styled from "styled-components";

const DayWrap = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  padding: 1%;
  border: 1px solid #203740;
  margin-bottom: 3%;
  background-color: #cde6ff;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 5px -5px #67737f;
    transform: scale(1.05);
  }
  .date-area {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 25%;
    border-right: 1px dashed black;
    padding-right: 2%;
    color: white;
    text-shadow: -2px 0 #3f5f7f, 0 2px #3f5f7f, 2px 0 #3f5f7f, 0 -2px #3f5f7f;
    font-weight: bold;
    font-size: 1.5rem;

    button {
      width: 80%;
      margin-top: 10%;
      height: auto;
      font-size: 0.75rem;
      background-color: white;
      color: #3f5f7f;
      border: 1px solid #3f5f7f;
      &:hover {
        background-color: #3f5f7f;
        color: white;
        border: 1px solid white;
      }
    }
  }
`;

const EventWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

class Day extends React.Component {
  state = {
    showModal: false
  };

  toggleModal = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));

  render() {
    let cards = null;
    const props = this.props;
    if (props.events) {
      cards = Object.keys(props.events).map(key => {
        const event = props.events[key];

        return (
          <Event
            key={key}
            event={event}
            deleteEvent={() => props.deleteEvent(props.addr, key)}
            editEvent={data => props.addOrEditEvent(data, props.addr, key)}
          />
        );
      });
    }
    return (
      <DayWrap>
        <div className="date-area">
          {props.day}
          <button onClick={this.toggleModal}>Add Event</button>
        </div>
        <EventWrap>{cards}</EventWrap>

        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <Form
              heading="Add a Card"
              onSubmit={data => {
                this.props.addOrEditEvent(data, this.props.addr);
                this.toggleModal();
              }}
            />
          </Modal>
        )}
      </DayWrap>
    );
  }
}

export default Day;
