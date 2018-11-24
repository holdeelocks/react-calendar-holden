import React from "react";
import PropTypes from "prop-types";
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
    text-shadow: 3px 3px #3f5f7f;
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

const EventWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Event = styled.div`
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
  opacity: 0.75;
  &:hover {
    box-shadow: -3px -3px #67737f;
    border: 1px solid #67737f;
  }
`;

const Day = props => {
  return (
    <DayWrap>
      <div className="date-area">
        {props.date.format("ddd, Do")}
        <button onClick={props.click} data-date={props.date.format("YYYYMMDD")}>
          Add Event
        </button>
      </div>
      <EventWrapper>
        {props.events &&
          Object.keys(props.events).map(key => {
            return (
              <Event key={props.events[key].time}>
                <p key={props.events[key].time}>{props.events[key].title}</p>
                <p>{props.events[key].time}</p>
                <p>{props.events[key].description}</p>
              </Event>
            );
          })}
      </EventWrapper>
    </DayWrap>
  );
};

Day.propTypes = {
  date: PropTypes.object.isRequired,
  events: PropTypes.objectOf(PropTypes.object.isRequired)
};

export default Day;
