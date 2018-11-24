import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Form from "./Form";

const EventWrap = styled.div`
  font-weight: bold;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  margin: 0;
  margin-left: 2%;
  padding: 1%;
  border: 1px solid #a4b8cc;
  text-align: center;
  cursor: pointer;
  background-color: white;
  &:hover {
    box-shadow: -3px -3px #67737f;
    border: 1px solid #67737f;
  }
`;

class Event extends React.Component {
  state = {
    showModal: false
  };

  toggleModal = () =>
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));

  render() {
    const props = this.props;
    return (
      <EventWrap>
        <h2>{props.event.title}</h2>
        <div>
          <span className="badge">{props.event.time}</span>
        </div>
        <div>{props.event.description}</div>
        <div className="icons">
          <button onClick={this.toggleModal}>Edit</button>
          <button onClick={props.deleteEvent}>Delete</button>
        </div>
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <Form
              heading="Edit card"
              onSubmit={data => {
                props.editEvent(data);
                this.toggleModal();
              }}
            />
          </Modal>
        )}
      </EventWrap>
    );
  }
}

export default Event;
