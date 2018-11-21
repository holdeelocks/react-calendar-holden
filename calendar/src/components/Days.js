import React from "react";
import PropTypes from "prop-types";
// import moment from "../momentRange";
import styled from "styled-components";

const DayWrap = styled.div`
  height: 150px;
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
`;

const Event = styled.div`
  font-weight: bold;
  margin-left: 2%;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  p {
    margin: 0;
    margin-left: 2%;
    padding: 1%;
    border: 1px solid lightblue;
    text-align: center;
    cursor: pointer;
    background-color: #a4b8cc;
    opacity: 0.75;
    &:hover {
      box-shadow: -3px -3px #67737f;
      border: 1px solid #67737f;
    }
  }
`;

const Day = props => {
  return (
    <DayWrap>
      {props.date.format("ddd, Do")}
      <Event>
        {props.events &&
          Object.keys(props.events).map(key => {
            return (
              <p key={props.events[key].time}>{props.events[key].title}</p>
            );
          })}
      </Event>
    </DayWrap>
  );
};

Day.propTypes = {
  date: PropTypes.object.isRequired,
  events: PropTypes.objectOf(PropTypes.object.isRequired)
};

export default Day;
